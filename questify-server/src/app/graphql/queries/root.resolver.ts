import { Resolver, Query } from "@nestjs/graphql";

@Resolver()
export class RootResolver {
  @Query(()=>String)
  sayHello() { return 'hello'}
}