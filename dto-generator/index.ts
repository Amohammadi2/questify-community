import { ClassDeclarationStructure, OptionalKind, Project } from "ts-morph";

const project = new Project({
  tsConfigFilePath: "./tsconfig.json",
  skipAddingFilesFromTsConfig: true
})

project.addSourceFileAtPath('./sample.ts');


project.getSourceFiles().forEach(source => {


  source.getClasses()
    // classes having the @Schema decorator
    .filter(c=>c.getDecorators().filter(d=>d.getName()=="Schema").length != 0)
    .forEach(c => {
      
    })

  source.save();
})