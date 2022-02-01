import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { useRouter} from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzY0ODI1NSwiZXhwIjoxOTU5MjI0MjU1fQ.ze2TBae9StlGR1-I8PEiTRtajkF8jIPXamezuONrebk';
const SUPABASE_URL = 'https://toistrsczjqowpcgvdvz.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagemEmTempoReal(adcionaMensagem) {
   return supabaseClient
    .from('mensagens')
    .on('INSERT', (respostaLive) =>{
      adcionaMensagem(respostaLive.new);
   })
   .subscribe();
}

export default function ChatPage() {
  // Sua lógica vai aqui
  const roteamento = useRouter(); 
  const usuarioLogado = roteamento.query.username;
  // console.log('roteamento.query', roteamento.query)
  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

  React.useEffect(() =>{
      supabaseClient
        .from('mensagens')
        .select('*')
        .order('id', { ascending: false})
        .then(({ data }) => {
         // console.log('Dados da consulta', data);
          setListaDeMensagens(data);
        });

        escutaMensagemEmTempoReal((novaMensagem) => {
          console.log('Nova mensagem:', novaMensagem);
          console.log('listaDeMensagens:', listaDeMensagens);
        //  setListaDeMensagens([
         //   novaMensagem,
          //  ...listaDeMensagens
         // ])
              setListaDeMensagens((valorAtualDaLista) =>{
                return [
                  novaMensagem,
                  ...valorAtualDaLista,
                ]
              });
        });
  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      // id: listaDeMensagens.length + 1,
      de: usuarioLogado,
      texto: novaMensagem,
    };

    supabaseClient
    .from('mensagens')
    .insert([
      mensagem
    ])
    .then(({ data }) => {
        console.log ('Criando mensagem: ',  data);
    });

   // setListaDeMensagens([
   //   mensagem,
   // ...listaDeMensagens,
   // ]);

    setMensagem("");
  }

  // ./Sua lógica vai aqui
  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://f.i.uol.com.br/fotografia/2021/10/18/1634577429616dac156d431_1634577429_3x2_md.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgba(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          opacity: "85%",
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList mensagens ={listaDeMensagens} />
          
          {/* {listaDeMensagens.map((mensagemAtual) => {
                            console.log(mensagemAtual)
                            return(
                                <li key={mensagemAtual.id}>
                                    {mensagemAtual.de}: {mensagemAtual.texto}
                                </li>   
                            )
                        })}*/}

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
               // console.log(event);
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            {/* CallBack */}
            <ButtonSendSticker
              onStickerClick={(sticker) =>{
                // console.log('Salva esse sticker no banco');
                handleNovaMensagem(':sticker:' + sticker);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
 // console.log(props.listaDeMensagens);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "14px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
                <Text tag="strong">
                  {mensagem.de}
                </Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {mensagem.texto.startsWith(':sticker:')
              ? (
                <Image src={mensagem.texto.replace(':sticker:','')} 
                  styleSheet={{
                      maxWidth:'25vh'
                  }} />
              )
              : (
                mensagem.texto
              )
            }
          </Text>
        );
      })}
    </Box>
  );
}

/*
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

export default function PaginaDoChat () {
    const roteamento = useRouter ();
    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent:'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: 'url(https://f.i.uol.com.br/fotografia/2021/10/18/1634577429616dac156d431_1634577429_3x2_md.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize:'cover', backgroundBlendMode: 'multiply',
                }} >
                    
                <Box
                    styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: {
                        xs: 'column',
                        sm: 'row',
                    },
                    width: '100%', maxWidth: '700px',
                    borderRadius: '100px', padding: '30px', margin: '16px',
                    boxShadow: '0 15px 10px 0 rgb(0 0 0 / 20%,)',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}>
                        /* Formulário */
/* <Box
                        as="form"
                        onSubmit={function (infosDoEvento) {
                            infosDoEvento.preventDefault();
                            console.log('alguem submeteu um form');
                            roteamento.push('/');
                        // window.location.href = "/chat"
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '60%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                        >
                            <Titulo tag="h1">Ambiente em Ajuste.<br/> Logo será seu espaço preferido! <br/>☕</Titulo>

                        <Button
                            type='submit'
                            label='Voltar ao balcão'
                            fullWidth
                            buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["000"],
                            mainColor: appConfig.theme.colors.primary[501],
                            mainColorLight: appConfig.theme.colors.primary[400],
                            mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                         
                </Box>


            </Box> 
        </>
    );
} */
