export interface RespuestaUsuarios{
    msg?:any
    results:{
        id?:        string,
        usuario?:   string,
        apellidos?: string,
        rol?:       string,
        password?:  string,
        aprobado?:  string,
        correo?:    string,
        direccion?: string,
        celular:    string,
        
    }
}

export interface RespuestaAprobacion{
    msg?         : any; 
}

