import React, { useState } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "./CandidateForm.css";
import logo from "../assets/logo_branca.png";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

const estados = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

const orgaos = [
  { value: "SSP", label: "Secretaria de Segurança Pública" },
  { value: "DIC", label: "Diretoria de Identificação Civil" },
  { value: "PF", label: "Polícia Federal" },
  { value: "DETRAN", label: "Departamento Estadual de Trânsito" },
  { value: "CC", label: "Cartório Civil" },
  { value: "ABNC", label: "Academia Brasileira de Neurocirurgia" },
  {
    value: "CGPI/DUREX/DPF",
    label: "Coordenação Geral de Polícia de Imigração da Polícia Federal",
  },
  { value: "CGPI", label: "Coordenação-Geral de Privilégios e Imunidades" },
  {
    value: "CGPMAF",
    label:
      "Coordenadoria Geral de Polícia Marítima, Aeronáutica e de Fronteiras",
  },
  { value: "CNIG", label: "Conselho Nacional de Imigração" },
  { value: "CNT", label: "Confederação Nacional de Transporte" },
  { value: "COREN", label: "Conselho Regional de Enfermagem" },
  { value: "CORECON", label: "Conselho Regional de Economia" },
  { value: "CRA", label: "Conselho Regional de Administração" },
  { value: "CRAS", label: "Centro de Referência de Assistência Social" },
  { value: "CRB", label: "Conselho Regional de Biblioteconomia" },
  { value: "CRC", label: "Conselho Regional de Contabilidade" },
  { value: "CRE", label: "Conselho Regional de Estatística" },
  { value: "CREA", label: "Conselho Regional de Engenharia e Agronomia" },
  { value: "CRECI", label: "Conselho Regional de Corretores de Imóveis" },
  {
    value: "CREFIT",
    label: "Conselho Regional de Fisioterapia e Terapia Ocupacional",
  },
  { value: "CRESS", label: "Conselho Regional de Serviço Social" },
  { value: "CRF", label: "Conselho Regional de Farmácia" },
  { value: "CRM", label: "Conselho Regional de Medicina" },
  { value: "CRN", label: "Conselho Regional de Nutrição" },
  { value: "CRO", label: "Conselho Regional de Odontologia" },
  { value: "CRP", label: "Conselho Regional de Psicologia" },
];

interface SelectOption {
  value: string;
  label: string;
}

interface FormData {
  cpf: string;
  rg: string;
  orgaoEmissor: string;
  estadoEmissao: string;
  dataEmissao: Date;
  naturalidade: string;
  nomeCompleto: string;
  nomeMae: string;
  sexo: string;
  dataNascimento: Date;
  telefone: string;
  instagram: string;
  email: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  complemento: string;
  pontoReferencia: string;
  linkLocalizacao: string;
}

const customStyles: StylesConfig<SelectOption, false> = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "black" : "white",
    backgroundColor: state.isSelected ? "#007bff" : "black",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "black",
    color: "white",
  }),
};

const CandidateForm = () => {
  const [formData, setFormData] = useState<FormData>({
    cpf: "",
    rg: "",
    orgaoEmissor: "",
    estadoEmissao: "",
    dataEmissao: new Date(),
    naturalidade: "",
    nomeCompleto: "",
    nomeMae: "",
    sexo: "",
    dataNascimento: new Date(),
    telefone: "",
    instagram: "",
    email: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    complemento: "",
    pontoReferencia: "",
    linkLocalizacao: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (
    selectedOption: SingleValue<SelectOption>,
    name: keyof FormData
  ) => {
    if (selectedOption) {
      setFormData({ ...formData, [name]: selectedOption.value });
    }
  };

  const handleDateChange = (date: Date, name: keyof FormData) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleLocationClick = () => {
    // Lógica para abrir o Google Maps e pegar o link de localização
    //abre o google maps numa nova aba
    window.open("https://www.google.com/maps", "_blank");
  };

  const formatarTexto = (valor: string, mascara: string) => {
    let i = 0;
    const v = valor.replace(/\D/g, ""); // Remove caracteres não numéricos
    return mascara.replace(/#/g, () => (i < v.length ? v[i++] : ""));
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleMaskedChange(e, "#####-###");
    const cep = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cep.length === 8) {
      // Verifica se o CEP tem 8 dígitos
      console.log("Buscando CEP:", cep);
      axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          const { logradouro, bairro, localidade } = response.data;
          console.log("response:", response.data);
          setFormData((prevFormData) => ({
            ...prevFormData,
            endereco: logradouro || "",
            bairro: bairro || "",
            cidade: localidade || "",
          }));
        })
        .catch((error) => {
          console.error("Erro ao buscar CEP:", error);
        });
    }
  };

  const handleMaskedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    mascara: string
  ) => {
    const { name, value } = e.target;
    if (
      typeof formData[name as keyof FormData] === "string" &&
      value.length < (formData[name as keyof FormData] as string).length
    ) {
      // Se o valor está sendo removido, apenas atualize o estado, removendo todos os caracteres não numéricos
      setFormData({ ...formData, [name]: value.replace(/\D/g, "") });
    } else {
      // Se o valor está sendo adicionado, aplique a máscara
      setFormData({ ...formData, [name]: formatarTexto(value, mascara) });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="candidate-form">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Cadastro de Candidato</h1>
      <h2>Informe todos os seus dados corretamente!</h2>
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <div className="form-section">
          <h3>Informações Pessoais</h3>
          <label>
            CPF DO CANDIDATO:
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={(e) => handleMaskedChange(e, "###.###.###-##")}
            />
          </label>
          <label>
            RG DO CANDIDATO:
            <input
              type="text"
              name="rg"
              value={formData.rg}
              onChange={(e) => handleMaskedChange(e, "##.###.###")}
            />
          </label>
          <label>
            ORGÃO EMISSOR:
            <Select
              options={orgaos}
              styles={customStyles}
              value={orgaos.find(
                (option) => option.value === formData.orgaoEmissor
              )}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "orgaoEmissor")
              }
            />
          </label>
          <label>
            ESTADO DE EMISSÃO DO RG:
            <Select
              options={estados}
              styles={customStyles}
              value={estados.find(
                (option) => option.value === formData.estadoEmissao
              )}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "estadoEmissao")
              }
            />
          </label>
          <label>
            DATA DE EMISSÃO DO RG:
            <input
              type="date"
              name="dataEmissao"
              value={
                formData.dataEmissao instanceof Date &&
                !isNaN(formData.dataEmissao.getTime())
                  ? formData.dataEmissao.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                handleDateChange(new Date(e.target.value), "dataEmissao")
              }
              className="date-picker"
            />
          </label>
          <label>
            NATURALIDADE:
            <input
              type="text"
              name="naturalidade"
              value={formData.naturalidade}
              onChange={handleChange}
            />
          </label>
          <label>
            NOME COMPLETO:
            <input
              type="text"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleChange}
            />
          </label>
          <label>
            NOME DA MÃE:
            <input
              type="text"
              name="nomeMae"
              value={formData.nomeMae}
              onChange={handleChange}
            />
          </label>
          <label>
            SEXO:
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="sexo"
                  value="Masculino"
                  checked={formData.sexo === "Masculino"}
                  onChange={handleChange}
                />
                <span className="custom-radio"></span>
                Masculino
              </label>
              <label>
                <input
                  type="radio"
                  name="sexo"
                  value="Feminino"
                  checked={formData.sexo === "Feminino"}
                  onChange={handleChange}
                />
                <span className="custom-radio"></span>
                Feminino
              </label>
            </div>
          </label>
          <label>
            DATA DE NASCIMENTO:
            <input
              type="date"
              name="dataNascimento"
              value={
                formData.dataNascimento instanceof Date &&
                !isNaN(formData.dataNascimento.getTime())
                  ? formData.dataNascimento.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                handleDateChange(new Date(e.target.value), "dataNascimento")
              }
            />
          </label>
        </div>
        <div className="form-section">
          <h3>Contato</h3>
          <label>
            NÚMERO DE TELEFONE CELULAR COM DD:
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={(e) => handleMaskedChange(e, "(##) #####-####")}
            />
          </label>
          <label>
            INSTAGRAM:
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
            />
          </label>
          <label>
            EMAIL:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-section">
          <h3>Endereço</h3>
          <label>
            CEP:
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleCepChange}
            />
          </label>
          <label>
            ENDEREÇO:
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
            />
          </label>
          <label>
            Nº:
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
            />
          </label>
          <label>
            BAIRRO:
            <input
              type="text"
              name="bairro"
              value={formData.bairro}
              onChange={handleChange}
            />
          </label>
          <label>
            CIDADE:
            <input
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
            />
          </label>
          <label>
            COMPLEMENTO:
            <input
              type="text"
              name="complemento"
              value={formData.complemento}
              onChange={handleChange}
            />
          </label>
          <label>
            PONTO DE REFERÊNCIA:
            <input
              type="text"
              name="pontoReferencia"
              value={formData.pontoReferencia}
              onChange={handleChange}
            />
          </label>
          <label>
            LINK DE LOCALIZAÇÃO:
            <input
              type="text"
              name="linkLocalizacao"
              value={formData.linkLocalizacao}
              onChange={handleChange}
            />
            <button type="button" onClick={handleLocationClick}>
              Pegar do mapa
            </button>
          </label>
        </div>
        <button type="submit">Enviar</button>
      </form>
      <footer className="footer">
        <p>Copyright © 2025 Digital. Todos os direitos reservados.</p>
        <p>
          Digital Tecnologia &amp; Telecomunicação Ltda.
          <br />
          CNPJ: 07.578.965/0001-05
        </p>
        <p>
          <a
            href="https://www.facebook.com/minhadigital.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook /> Facebook
          </a>{" "}
          |
          <a
            href="https://www.instagram.com/minhadigital.net_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram /> Instagram
          </a>{" "}
          |
          <a
            href="https://www.youtube.com/@minhadigital.net_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube /> YouTube
          </a>{" "}
          |
          <a
            href="https://api.whatsapp.com/send?phone=5508000813125&amp;text=Ol%C3%A1%20DIGITAL"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp /> WhatsApp
          </a>
        </p>
      </footer>
    </div>
  );
};

export default CandidateForm;