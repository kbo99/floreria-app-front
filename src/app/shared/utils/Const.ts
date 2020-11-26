export class Cosnt {
 public static URL_SERVICIOS: String = "http://localhost:8005/";

 public static CLI_ID: string = "frondEndApp";
 public static SECRET: string = "123456";

 // Grupos
 public static USUARIO: String = "ROLE_USUARIO";
 public static CLIENTE: String = "ROLE_CLIENTE";
 public static EDITOR_PRODUCTOS: String = "ROLE_EDIT_PROD";
 public static AGREGAR_PRODUCTOS: String = "ROLE_ADD_PROD";
 public static ADMIN_USUARIOS: String = "ROLE_ADMIN_USU";

 public static PROD_CONFIG: string = "PROD_EDIT_CONFIG";
 public static INS_CONFIG: string = "INS_EDIT_CONFIG";

 public static PROD_ADD_IN: string = "PROD_ADD_CONFIG";
 public static USUARIO_EDIT: string = "usuario_editar";

 public static DIRECCION_EDIT: string = "DIRECCION_EDIT";
 public static PERSONA_EDIT: string = "PERSONA_EDIT";

 public static PATH_ORIGEN: string = "ORIGEN";

 public static getRandomInt(superior:number, inferior:number):number {
   var numPosibilidades = superior - inferior;
   var aleatorio = Math.random() * (numPosibilidades + 1);
   aleatorio = Math.floor(aleatorio);
   return (inferior + aleatorio) * -1;
 }

 public static amazon_s3_endpoint : string = "https://s3.us-east-2.amazonaws.com/gyft.flowers.produccion/";

}



