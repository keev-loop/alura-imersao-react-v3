import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import React from 'react';


function ProfileSideBar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.gitHubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.gitHubUser}`}>
          @{propriedades.gitHubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />

    </Box>  
  )
}


function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">{propriedades.title} ({propriedades.itens.length})</h2>
            <ul>
              {propriedades.itens.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
      </ProfileRelationsBoxWrapper> 
  )
}


export default function Home() {

    const usuarioGit = 'keev-loop';
    const [comunidades, setComunidades] = React.useState([]);
    
    const pessoasFavoritas = [
      'juunegreiros', 
      'omariosouto',
      'peas',
      'rafaballerini',
      'marcobrunodev',
      'felipefialho'
    ];
 

    const [seguidores, setSeguidores] = React.useState([]);
    React.useEffect(function() {
      fetch('https://api.github.com/users/peas/followers')
        .then(function (respostaDoServidor) {
          return respostaDoServidor.json();
        })
        .then(function (respostaCompleta) {
          setSeguidores(respostaCompleta)
        })

        fetch('https://graphql.datocms.com/', {
          method: 'POST',
          headers: {
            'Authorization': 'f7dc06e34e6796a61136e8838d165e',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ "query": `query {
            allCommunities {
              id
              title
              imageUrl
              creatorSlug
            }
          }`})
        })
        .then((response) => response.json())
        .then((respostaCompleta) => {
          const comunidadesDato = respostaCompleta.data.allCommunities;
          setComunidades(comunidadesDato)
          console.log(comunidadesDato)
        })

    }, [])
    

    return (
      <>
      <AlurakutMenu />
      <MainGrid>

        <div className="profileArea" style={{ gridArea: 'profileArea' }}> 
          <ProfileSideBar gitHubUser={usuarioGit} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();

              const dadosDoForm = new FormData(e.target);
              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: usuarioGit,
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado)
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
              })

              
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa" 
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>    
        </div>

        <div className="relationArea" style={{ gridArea: 'relationArea' }}>

          <ProfileRelationsBox title="Seguidores" itens={seguidores} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/comunities/${itemAtual.id}`} key={itemAtual.title}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper> 
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">GitFriends ({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper> 
        </div>

      </MainGrid>
      </>
    )
}