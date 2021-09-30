import React from 'react';
import { connect } from 'react-redux'
import Button from "@material-ui/core/Button";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      errorMsg: ''
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ errorMsg: `${error} ---> ${JSON.stringify(errorInfo)}` })
    console.error("ERROR_BOUNDARY",error, errorInfo);
  }

  backToApplication(){
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <section>
          <h1 style={{marginBottom: 8}}>Ups! Algo salió mal <span role="img" aria-label="sad emoji">😕</span></h1>
          <h5 style={{marginTop: 8}}>Por ahora no podrás acceder a esta sección</h5>
          <span>Compartí este mensaje de error con los administradores del sistema:</span>
          <div style={{backgroundColor:'#F5B7B1 ', padding: 12, lineHeight: 1, margin: '8px 0'}}>
            <code>{JSON.stringify(this.state.errorMsg)}</code>
          </div>

          <p>Trabajaremos en arreglarlo! <span role="img" aria-label="working on that!">⚠️</span></p>          
          <div style={{ display:'inline-flex', width:'100%', justifyContent:'center', gap: 24}}>
            <Button onClick={() => this.backToApplication()}>
              Volver a la aplicación
            </Button>
            <Button color="primary" variant="contained" onClick={() => this.props.closeSession()}>
              Cerrar sesión para limpiar datos
            </Button>
          </div>
        </section>
      )
    }

    return this.props.children; 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeSession: () => {
      dispatch({ type: "SET_TOKEN", payload: { token: null } });
    },
  };
};

export default connect(null, mapDispatchToProps)(ErrorBoundary)