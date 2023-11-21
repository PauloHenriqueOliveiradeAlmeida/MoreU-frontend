import { useEffect, useRef } from "react";
import "./assets/styles/bootstrap/bootstrap.css"
import "./assets/styles/bootstrap/responsive.css"
import { Link } from "react-router-dom";

function App() {
  const slide = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setInterval(() => {
      if (slide.current) {
        slide.current.scrollLeft += slide.current.scrollWidth / 3

        if ((slide.current.scrollLeft + slide.current.scrollWidth / 3) === slide.current.scrollWidth) {
          slide.current.scrollLeft = 0
        }
      }
    }, 4000)
  }, [])


  return (
    <>
      <div className="hero_area">
        <header className="header_section">
          <div className="container-fluid">
            <nav className="navbar custom_nav-container">
              <Link className="navbar-brand" to="/"> {/*Transformar em Link*/}
                <span>
                  More Ü
                </span>
              </Link>

              <div className="quote_btn-container">
                <Link to="/login" className="quote_btn">
                  Entrar
                </Link>
              </div>
            </nav>
          </div>
        </header>

        <section className="carousel-container" ref={slide}>
          <figure>
            <img src="slide1.svg" />
            <figcaption>
              <h2>MoreÜ</h2>
              <p>Empresa especializada em consultoria,
                infraestrutura tecnológica e
                implementação para o seu negócio!</p>
            </figcaption>
          </figure>

          <figure>
            <img src="slide2.svg" />
            <figcaption>
              <h2>Nossos princípios</h2>
              <p>A MoreÜ tem como princípios a praticidade, inovação e sustentabilidade</p>
            </figcaption>
          </figure>
          <figure>
            <img src="slide3.svg" />
            <figcaption>
              <h2>Nós e meio ambiente</h2>
              <p>A More Ü é uma empresa que abraça o meio ambiente e causas sociais, sempre visando um mundo melhor e sustentável</p>
            </figcaption>
          </figure>
        </section>

      </div>


      <section className="service_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>
              Nossos diferenciais
            </h2>
            <p>
              Entenda o que difere nós da More Ü dos demais!
            </p>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="box">
                <div className="img-box">
                  <img src="s1.png" alt="" />
                </div>
                <div className="detail-box">
                  <h5>
                    Estrutura
                  </h5>
                  <p>
                    Realizamos toda a infraestrutura tecnológica de sua empresa para que você não precise se preocupar!
                  </p>

                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="box">
                <div className="img-box">
                  <img src="s2.png" alt="" />
                </div>
                <div className="detail-box">
                  <h5>
                    Relatórios
                  </h5>
                  <p>
                    Controle e gere relatórios dos ativos de sua empresa a partir de um sistema simples, prático e personalizado
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="box">
                <div className="img-box">
                  <img src="s3.png" alt="" />
                </div>
                <div className="detail-box">
                  <h5>
                    Consultoria
                  </h5>
                  <p>
                    Escutamos seus requisitos, alinhamos expectativas e oferecemos sempre os melhores produtos do mercado
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="box">
                <div className="img-box">
                  <img src="s4.png" alt="" />
                </div>
                <div className="detail-box">
                  <h5>
                    Suporte
                  </h5>
                  <p>
                    Nossa equipe de suporte está sempre a disposição para solucionar seus problemas e tirar suas dúvidas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>
                    Sobre nós
                  </h2>
                </div>
                <p>
                  A frente da revolução tecnológica, a MoreÜ é uma empresa de consultoria e
                  implementação de infraestrutura de T.I que prioriza a singularidade de cada cliente.
                </p>
                <p>
                  Nossa abordagem vai além do convencional, centrando-se nas necessidades específicas de
                  cada organização. Com uma equipe de especialistas altamente qualificados e uma compreensão
                  profunda das operações de negócio, criamos soluções personalizadas que impulsionam o sucesso
                  a longo prazo.
                </p>
                <p>
                  Entendemos que a demanda por T.I é diversificada e em constante evolução.
                  Por isso, nossa equipe não apenas domina as últimas tecnologias,
                  mas também está imersa no entendimento das particularidades de diferentes setores e
                  portes de empresas.<br /> Desde a concepção de redes complexas até a gestão de dados críticos,
                  nossas soluções são projetadas para estar no topo da tecnologia, mantendo a segurança e confiabilidade
                  como prioridades inabaláveis.
                </p>


              </div>
            </div>
            <div className="col-md-6">
              <figure>
                <img className="img img-fluid rounded" src="sobre.png" alt="sobre" />
              </figure>
            </div>

          </div>
        </div>
      </section>


      <section className="case_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>
              Nosso cliente
            </h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="box">
                <div className="img-box">
                  <img src="sala.png" alt="" />
                </div>
                <div className="detail-box text-left">
                  <h5>
                    Ü More
                  </h5>
                  <p>
                    Atualmente, temos a honra de contar com a parceria da ÜMore como nosso maior cliente.
                  </p>
                  <p>
                    Esta empresa está em um constante processo de evolução,
                    e seu propósito é verdadeiramente inspirador.
                    A ÜMore não apenas busca o sucesso comercial, mas também almeja um impacto positivo
                    e duradouro na comunidade e no mundo como um todo.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="box">
                <div className="img-box">
                  <img src="logo-1.png" alt="logo Ümore" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>



      <div className="footer_container">
        <footer className="footer_section">
          <div className="container">
            <img src="arara.png" height="100" width="100" />
            <p>
              &copy; <span id="displayYear"></span> All Rights Reserved By More Ü
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App;
