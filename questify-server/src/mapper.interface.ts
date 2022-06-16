export interface IMapper <NeoModelType, DomainModelType> {
  toNeoModel(domainModel: DomainModelType): NeoModelType;
  toDomainModel(neoModel: NeoModelType): DomainModelType;
}