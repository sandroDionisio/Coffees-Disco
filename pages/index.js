import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from "next/router";
import appConfig from '../config.json';

function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx> {`
                    ${Tag} {
                        color: ${appConfig.theme.colors.neutrals['000']};
                        font-size: 24px;
                        font-weight: 600;
                    }
            `}</style>
        </>  
    );
}

// Componente React
/*function HomePage() {
    // JSX
    return ( 
        <div>
             <GlobalStyle/>  
/*           <Titulo tag="h2"> Boas vindas de volta!</Titulo>
           <h2>Discord - CoffeeCord</h2>
           
        
        </div>
        
    )
}*/
/*export default HomePage*/

export default function PaginaInicial() {
    // const username = 'SandroDionisio';
  const [username, setUsername] = React.useState('sandroDionisio');
  const roteamento = useRouter(); 

    return (
      <>
       
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: 'url(https://static.turbosquid.com/Preview/001268/118/NO/Z.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '100px 10px 100px 100px', padding: '30px', margin: '16px',
              boxShadow: '0 15px 10px 0 rgb(0 0 0 / 20%)',
              opacity: '95%',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function (infosDoEvento) {
                infosDoEvento.preventDefault();
                console.log('alguem submeteu um form');
                roteamento.push(`/chat?username=${username}`);
               // window.location.href = "/chat"
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '60%' }, textAlign: 'center', marginBottom: '32px',
                
              }}
            >
              <Titulo tag="h1">Conversa com Café.<br/> Desfrute do ambiente!</Titulo>
              
              
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>
  
              {/*<input
               type="text"
               value={username}
               onChange={function (event){
                 console.log('Usuario digitou', event.target.value);
                // Onde esta o valor?
                 const valor = event.target.value;
                // Trocar o valor da variavel
                // atraves do React e avise quem precisa
                 setUsername(valor);
                 
               }}
               />*/}
               
               <TextField
               value={username}
               onChange={function (event){
                 console.log('Usuario digitou', event.target.value);
                // Onde esta o valor?
                 const valor = event.target.value;
                // Trocar o valor da variavel
                // atraves do React e avise quem precisa
                 setUsername(valor);
                 
               }}
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              /> 
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[501],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
              
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '10px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '10px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '60px 10px 60px 60px',
                flex: 1,
                minHeight: '200px',
                opacity: '94%',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '100px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
}
