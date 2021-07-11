
const redirect = {
  'Administrador': '/admin/usuarios',
  'Operario': '/operario/proceso',
  'unauthorized': '/unauthorized',
}

export default function redirectByPermissions(permissions){

  if (permissions?.includes('Administrador')){
    return redirect.Administrador;
  }

  if (permissions?.includes('Operario')){
    return redirect.Operario;
  }

  return redirect.unauthorized;
}