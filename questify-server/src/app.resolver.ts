import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class AppResolver {
  @Query(()=>String)
  public async hello() {
    return "Hi";
  }
}