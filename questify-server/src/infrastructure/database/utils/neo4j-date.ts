import { Injectable } from '@nestjs/common';
import { DateTime } from 'neo4j-driver';

@Injectable()
export class Neo4jDateTimeMapper {

  public toNeo4jDateTime(datetime: Date) {
    return new DateTime<number>(
      datetime.getFullYear(),
      datetime.getMonth()+1,
      datetime.getDay(),
      datetime.getHours(),
      datetime.getMinutes(),
      datetime.getSeconds(),
      0,
      datetime.getTimezoneOffset()*60 // minutes -> seconds
    )
  }

  public toNativeDatetime(datetime: DateTime<number>) {
    return datetime.toStandardDate();
  }

}



