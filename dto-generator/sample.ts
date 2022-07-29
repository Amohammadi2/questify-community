function Schema() {
  return function(cls) {
    console.log(cls)
  }
}


@Schema()
export class User {
  username: string; //dto:string
  password: string; //dto:string
  email: string;    //dto:string
}

