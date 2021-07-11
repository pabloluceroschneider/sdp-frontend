
const redirect = {
  'Administrador': '/admin/usuarios',
  'Operario': '/admin/operario',
}

export default function redirectByPermissions(permissions){

  if (permissions?.includes('Administrador')){
    return redirect.Administrador;
  }

  if (permissions?.includes('Operario')){
    return redirect.Operario;
  }

}