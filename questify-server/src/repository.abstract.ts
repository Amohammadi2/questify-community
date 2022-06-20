import { Neo4jService } from "nest-neo4j/dist";
import { IMapper } from "./mapper.interface";
import { INeoModel } from "./neomodel.interface";
import { getProps } from "./utils/get-props";

interface RelationshipInfo {
  direction: string;
  name: string;
  targetNodeLabel: string;
}

export abstract class Repository<NeoModel, DomainModel> {
  
  protected readonly nodeName: string;
  protected readonly mergeCondition: string = "{id: $payload.id}";

  constructor(
    protected readonly neo4jService: Neo4jService,
    protected readonly mapper: IMapper<NeoModel, DomainModel>
  ) {}

  public async save(domainModel: DomainModel): Promise<DomainModel | "save-failed"> {
    const result = await this.neo4jService.write(`
      WITH $payload as props
      MERGE (n:${this.nodeName} ${this.mergeCondition})
        SET n += props
      RETURN n AS node
    `, { payload: this.mapper.toNeoModel(domainModel)});

    if (result.records.length === 0) {
      return "save-failed";
    }

    return this.mapper.toDomainModel(getProps(result, 0, "node"));
  }

  public async create(domainModel: DomainModel): Promise<DomainModel | "create-failed"> {
    const result = await this.neo4jService.write(`
      WITH $payload as props
      CREATE (n:${this.nodeName}) 
        SET n += props 
      RETURN n AS node 
    `, { payload: this.mapper.toNeoModel(domainModel)});

    if (result.records.length === 0) {
      return "create-failed";
    }

    return this.mapper.toDomainModel(getProps(result, 0, "node"));
  }

  public async findWhere(queryFilterSpec: string, queryFilterParams: Partial<NeoModel>): Promise<DomainModel[]> {
    const result = await this.neo4jService.read(`
      MATCH (n:${this.nodeName}) WHERE ${queryFilterSpec} RETURN n AS node
    `, queryFilterParams);

    return result.records.map(record => this.mapper.toDomainModel(record.get('node').properties));
  }

  public async findOneWhere(queryFilterSpec: string, queryFilterParams: Partial<NeoModel>): Promise<DomainModel | "not-found"> {
    const result = await this.neo4jService.read(`
      MATCH (n:${this.nodeName}) WHERE ${queryFilterSpec} RETURN n AS node LIMIT 1
    `, queryFilterParams);

    if (result.records.length === 0) {
      return "not-found";
    }

    return this.mapper.toDomainModel(getProps(result, 0, "node"));
  }

  public async existsWhere(queryFilterSpec: string, queryFilterParams: Partial<NeoModel>): Promise<boolean> {
    const result = await this.neo4jService.read(`
      MATCH (n:${this.nodeName}) WHERE ${queryFilterSpec} RETURN n.id AS ID
    `, queryFilterParams);

    return result.records.length > 0;
  }

  public async traverse <TargetNeo4j, TargetModel> (startNodeID: string, pattern: string, mapper: IMapper<TargetNeo4j, TargetModel>): Promise<TargetModel[]> {
    const result = await this.neo4jService.read(`
      MATCH (n: ${this.nodeName} {id: $startNodeID})${pattern} RETURN m AS node
    `, { startNodeID, pattern });
    return result.records.map(record => mapper.toDomainModel(record.get('node').properties));
  }

  public async traverseOne <TargetNeo4j, TargetModel> (queryFilterSpec: string, params:object,  pattern: string, mapper: IMapper<TargetNeo4j, TargetModel>): Promise<TargetModel | "not-found"> {
    const result = await this.neo4jService.read(`
      MATCH (n: ${this.nodeName})${pattern} WHERE ${queryFilterSpec} RETURN m AS node LIMIT 1
    `, params);

    if (result.records.length === 0) {
      return "not-found";
    }

    return mapper.toDomainModel(getProps(result, 0, "node"));
  }
}

export abstract class EntityRepository <NeoModel extends INeoModel, DomainModel> extends Repository<NeoModel, DomainModel> {
  public async findOneByID(id: string): Promise<DomainModel | "not-found"> {
    return this.findOneWhere("n.id = $id", { id } as NeoModel);
  }
}