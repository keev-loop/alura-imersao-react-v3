import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


function ProfileSideBar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.gitHubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box> 
  )
}


export default function Home() {
    const usuarioGit = 'keev-loop';
    const pessoasFavoritas = [
      'juunegreiros', 
      'omariosouto',
      'peas',
      'rafaballerini',
      'marcobrunodev',
      'felipefialho'
    ];

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
        </div>
        <div className="relationArea" style={{ gridArea: 'relationArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">GitFriends ({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper> 
          <Box>Comunidades</Box> 
        </div>
      </MainGrid>
      </>
    )
}