import { IChallenge } from "interfaces/challenges.interface";
import { useState } from "react";
import {
  ChallengeSidebarContainer,
  Content,
  InstructionsContainer,
} from "./styles";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useRouter } from "next/router";

interface ChallengeSidebarProps {
  challenge: IChallenge;
}

export function ChallengeSidebar({ challenge }: ChallengeSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const router = useRouter();

  function goToHome() {
    router.push("/");
  }

  const markdown =
    '### Repositório hospeda cerca de 1,3 milhão de pacotes, atingindo métricas de até 75 bilhões de downloads mensais\r\n\r\nnpm é uma sigla para Node Package Manager, cuja tradução direta é bem simples: Gerenciador de Pacotes Node.\r\n\r\nÉ um recurso incluído e recomendado para usuários de Node.js, framework de desenvolvimento back end em JavaScript.\r\n\r\nO nome já é auto explicativo, no entanto, vamos destrinchar as peculiaridades da ferramenta um pouco além disso.\r\n\r\n[Somos uma plataforma completa de aprendizado contínuo em programação](https://www.rocketseat.com.br/?utm_source=blog&utm_medium=BLOG_CONTENT&utm_campaign=inbound-content&utm_term=organic&utm_content=npm)\r\n## npm é duas coisas\r\nSegundo a comunidade Node.js, [npm é, em tese, duas coisas](https://nodejs.org/en/knowledge/getting-started/npm/what-is-npm/): um repositório online para a publicação de projetos open-source em Node.js e uma linha de comando (código) utilizada para criar interações entre repositórios, instalação de pacotes, gerenciamento de versões e dependências.\r\n\r\nO seu repositório hospeda cerca de 1,3 milhão de pacotes, atingindo métricas de até 75 bilhões de downloads mensais. Este recurso pode ser explorado na [página oficial](https://www.npmjs.com/) da ferramenta e a instalação de qualquer pacote é expressa em uma única linha de comando.\r\n\r\n## Isaac Z. Schlueter\r\nCriado e desenvolvido em 2010 pelo engenheiro Isaac Z. Schlueter, na época que o Node.js ainda era uma ferramenta emergente. Naquele momento, o cenário de programação back end em JavaScript estava começando a ser desenvolvido e aperfeiçoado pela comunidade.\r\n\r\nSegundo Isaac, [nesta discussão histórica](https://github.com/nodejs/node-v0.x-archive/issues/5132#issuecomment-15432598), publicada em 2013 no GitHub, ele desenvolveu o npm porque:\r\n\r\n"tinha visto o empacotamento de módulos ser feito de maneira terrível e brilhante, e queria ter certeza de que o Node não acabaria com algo como [Pear](https://pt.wikipedia.org/wiki/PEAR)."\r\n\r\n## npm, Inc\r\nOs números não deram trégua: o recurso foi uma ferramenta crucial para o ambiente JS durante os próximos anos. Com o sucesso do ecossistema back end JavaScript — liderado pela comunidade Node.js —, em 2014 Isaac criou a empresa npm, Inc para formalizar a gestão da ferramenta e sua expansão cada vez mais significativa.\r\n\r\nEm 2020, o GitHub (já como subsidiária da Microsoft) comprou a npm, Inc com o objetivo de melhorar a infraestrutura do gerenciador de pacotes, além de agregar ainda mais para a experiência de desenvolvimento e da comunidade.\r\n\r\n[Aqui você vai encontrar o caminho para estar entre os melhores](https://www.rocketseat.com.br/?utm_source=blog&utm_medium=BLOG_CONTENT&utm_campaign=inbound-content&utm_term=organic&utm_content=npm)\r\n## Parte crítica do mundo JavaScript\r\nNat Friedman, CEO do GitHub, [ao anunciar a compra](https://github.blog/2020-03-16-npm-is-joining-github/) reconheceu que "npm é uma parte crítica do mundo JavaScript", justamente por sua participação referência durante estes 10 anos de maturidade e contribuição open source.\r\n\r\nGitHub é uma subsidiária da Microsoft desde 2018, numa compra estimada no valor de US$ 7,5 bilhões.\r\n\r\nApesar de ser uma atitude recente da Microsoft, uma das leituras possíveis é que [a gigante está investindo cada vez mais no ecossistema de código aberto JavaScript.](https://www.zdnet.com/article/microsoft-buys-javascript-developer-platform-npm-plans-to-integrate-it-with-github/)';

  return (
    <ChallengeSidebarContainer isOpen={isOpen}>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)}>
          <BsFillArrowLeftSquareFill />
        </button>
      )}
      <Content>
        <header>
          <div>
            <button onClick={goToHome}>back to home</button>
            <button onClick={() => setIsOpen(false)}>hide panel</button>
          </div>
          <h1>{challenge.title}</h1>
        </header>

        <InstructionsContainer>{markdown}</InstructionsContainer>
      </Content>
    </ChallengeSidebarContainer>
  );
}
