import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express"; // Importar Request de express
import { jwtConstanst } from '../constants/jwt.constants';


@Injectable()
export class AuthGuard implements  CanActivate {

    constructor(private readonly jwtService: JwtService, // Inyectar el servicio de JWT
    ) { } // Constructor del guard

    async canActivate(context: ExecutionContext): Promise<boolean>  {

        const request = context.switchToHttp().getRequest();// Obtener la solicitud HTTP

        const token = this.extractTokenFromHeader(request);// Extraer el token del encabezado de autorización
        if (!token) {// Si no hay token
          throw new UnauthorizedException();// Lanzar una excepción no autorizada
        }
        try {
        const payload = await this.jwtService.verifyAsync(token, {// Verificar el token
          secret: jwtConstanst.secret,// Clave secreta para verificar el token
        });
      
        request['user'] = payload;// Almacenar la carga útil en la solicitud
        } catch {
        throw new UnauthorizedException();// Lanzar una excepción no autorizada si la verificación falla
        }
          return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined { // Método para extraer el token del encabezado de autorización
        const [type, token] = request.headers.authorization?.split(' ') ?? [];// Dividir el encabezado de autorización en tipo y token
        return type === 'Bearer' ? token : undefined;// Verificar si el tipo es Bearer
      }
}