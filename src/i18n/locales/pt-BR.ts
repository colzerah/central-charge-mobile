// Idioma de referência: as chaves daqui definem o formato dos outros idiomas
// (o TypeScript acusa se faltar alguma tradução em pt-PT, en-US, zh-CN ou ru-RU).
//
// Plural: chaves com { one, other } são escolhidas pelo `count`
// (ex.: t("favorites.count", { count: 3 })). O russo também usa few/many.
const ptBR = {
  common: {
    yes: "Sim",
    no: "Não",
    ok: "Ok",
    cancel: "Cancelar",
    back: "Voltar",
    next: "Avançar",
    start: "Começar",
    skip: "Pular",
    remove: "Remover",
    delete: "Excluir",
    send: "Enviar",
    error: "Erro",
    oops: "Ops",
    loading: "Carregando...",
    typeHere: "Digite aqui",
    version: "Versão {{version}}",
    all: "Todas",
  },
  tabs: {
    home: "Início",
    favorites: "Favoritos",
    scan: "Escanear",
    notifications: "Notificações",
    menu: "Menu",
  },
  splash: {
    tagline: "Energia onde você estiver",
    slogan: "Conecte. Carregue. Siga.",
  },
  onboarding: {
    mapTitle: "Encontre pontos de recarga",
    mapDescription:
      "Veja no mapa os carregadores perto de você e trace a rota até eles.",
    scanTitle: "Recarregue pelo app",
    scanDescription:
      "Escaneie o QR Code do carregador para iniciar a recarga em segundos.",
    vehiclesTitle: "Cadastre seus veículos",
    vehiclesDescription:
      "Guarde os dados do seu carro para agilizar cada recarga.",
    historyTitle: "Acompanhe seu histórico",
    historyDescription:
      "Consulte recargas anteriores, consumo e valores quando quiser.",
  },
  input: {
    emailPlaceholder: "voce@exemplo.com",
    fullNamePlaceholder: "Digite seu nome completo",
  },
  auth: {
    tagline: "Entre e carregue seu veículo",
    email: "E-mail",
    password: "Senha",
    forgotPassword: "Esqueci minha senha",
    signIn: "Entrar",
    orContinueWith: "ou continue com",
    noAccount: "Ainda não tem conta?",
    createAccount: "Criar conta",
    requiredTitle: "Campos obrigatórios",
    requiredMessage: "Preencha e-mail e senha para entrar.",
    permissionsTitle: "Permissões obrigatórias",
    permissionsMessage:
      "Para continuar usando o aplicativo, permita o acesso à sua localização.",
    notNow: "Agora não",
    openSettings: "Abrir configurações",
    socialTitle: "Login social",
    socialMessage: "Entrar com {{provider}}",
    errors: {
      invalidCredentialsTitle: "Credenciais inválidas",
      invalidCredentialsMessage: "Verifique seu e-mail e senha.",
      unavailableTitle: "Serviço indisponível",
      unavailableMessage: "Tente novamente em alguns instantes.",
      offlineTitle: "Sem conexão",
      offlineMessage: "Verifique sua conexão com a internet.",
      unexpectedTitle: "Erro inesperado",
      unexpectedMessage: "Não foi possível realizar o login. Tente novamente.",
    },
  },
  register: {
    photo: "Foto de perfil",
    fullName: "Nome completo",
    fullNamePlaceholder: "Seu nome completo",
    email: "E-mail",
    emailPlaceholder: "voce@exemplo.com",
    phone: "Telefone",
    cpf: "CPF",
    password: "Senha",
    passwordPlaceholder: "mín. 6 caracteres",
    submit: "Criar conta",
    haveAccount: "Já tem uma conta?",
    signIn: "Entrar",
    fillName: "Preencha o nome completo.",
    nameRequired: "Nome é obrigatório.",
    fillEmail: "Preencha o e-mail.",
    emailRequired: "E-mail é obrigatório.",
    invalidEmail: "E-mail inválido.",
    invalidEmailMessage: "Use um e-mail no formato válido.",
    fillPhone: "Preencha o telefone.",
    phoneRequired: "Telefone é obrigatório.",
    invalidPhone: "Telefone inválido.",
    invalidPhoneMessage: "Digite um número de telefone válido.",
    fillCpf: "Preencha o CPF.",
    cpfRequired: "CPF é obrigatório.",
    invalidCpf: "CPF inválido.",
    invalidCpfMessage: "Digite um CPF válido.",
    fillPassword: "Preencha a senha.",
    passwordRequired: "Senha é obrigatória.",
    invalidPassword: "Senha inválida.",
    invalidPasswordMessage: "A senha precisa ter pelo menos 6 caracteres.",
    successTitle: "Conta criada com sucesso",
    successMessage: "Seja bem-vindo ao {{app}}!",
    errorTitle: "Erro ao criar conta",
  },
  forgotPassword: {
    title: "Esqueci minha senha",
    subtitle:
      "Informe seu telefone cadastrado para receber o código de verificação.",
    phone: "Celular",
    invalidPhone: "Digite um celular válido com DDD.",
    fillPhone: "Preencha o número de telefone.",
    sendCode: "Enviar código",
  },
  sendCode: {
    title: "Verificação",
    message: "Digite o código de 6 dígitos enviado para\n{{phone}}.",
    yourPhone: "seu telefone",
    notReceived: "Não recebeu?",
    resend: "Reenviar código",
    invalidCode: "Código incorreto. Tente novamente.",
  },
  newPassword: {
    title: "Nova senha",
    subtitle: "Defina uma nova senha para acessar sua conta {{app}}.",
    newPassword: "Nova senha",
    confirmPassword: "Confirmar senha",
    enterNew: "Digite sua nova senha.",
    minLength: "A senha deve ter pelo menos 6 caracteres.",
    mismatch: "As senhas não coincidem.",
    errorTitle: "Erro ao preencher as senhas",
    successTitle: "Senha alterada!",
    successMessage:
      "Sua senha foi atualizada com sucesso. Agora você pode entrar no aplicativo.",
    save: "Salvar nova senha",
  },
  avatar: {
    photoTitle: "Foto de perfil",
    photoMessage: "Como deseja adicionar sua foto?",
    takePhoto: "Tirar foto",
    chooseLibrary: "Escolher da galeria",
    selectError: "Não foi possível selecionar a foto. Tente novamente.",
    permissionsTitle: "Permissões necessárias",
    permissionsMessage:
      "Permita o acesso à câmera e às fotos para adicionar uma foto de perfil.",
    requestError: "Não foi possível solicitar acesso à câmera e às fotos.",
    permissionsError:
      "Não foi possível solicitar as permissões. Tente novamente.",
  },
  status: {
    available: "Disponível",
    occupied: "Ocupado",
    broken: "Indisponível",
    offline: "Offline",
  },
  home: {
    filters: "Filtros",
    searchSubtitle: "Pesquise pelo nome",
    searchEmpty: "Vazia",
    legend: {
      title: "Legenda",
      availableDescription: "Pronto para carregar",
      occupiedDescription: "Em uso no momento",
      brokenDescription: "Fora de serviço",
    },
    sheet: {
      plugsHere: "PLUGS NESTE PONTO",
      connectors: {
        one: "{{count}} conector",
        other: "{{count}} conectores",
      },
      go: "Ir",
      details: "Ver detalhes",
    },
  },
  filter: {
    title: "Filtros",
    apply: "Aplicar",
    clear: "Limpar filtros",
    statusTitle: "Situação do carregador",
    statusDescription: "Selecione uma ou mais situações",
    distanceTitle: "Distância máxima",
    distanceDescription: "A partir da sua localização",
    noLimit: "Sem limite",
    powerTitle: "Potência mínima",
    powerDescription: "Filtre por potência do carregador",
    brandTitle: "Marca da estação",
    brandDescription: "Selecione uma ou mais marcas",
    stations: {
      one: "{{count}} estação",
      other: "{{count}} estações",
    },
  },
  navigation: {
    openWith: "Abrir rota com",
    error: "Não foi possível abrir o app de navegação.",
  },
  location: {
    denied: "Permissão de localização negada",
    error: "Erro ao obter localização",
  },
  stationDetails: {
    title: "Detalhes da estação",
    kwMax: "kW máx",
    pricePerKwh: "R$/kWh",
    plugs: "PLUGS DISPONÍVEIS",
    address: "ENDEREÇO",
    support: "SUPORTE TÉCNICO",
    reportProblem: "Relatar um problema",
    schedule: "HORÁRIOS DE FUNCIONAMENTO",
    scanQr: "Escanear QR Code",
  },
  weekdays: {
    MONDAY: "Segunda-feira",
    TUESDAY: "Terça-feira",
    WEDNESDAY: "Quarta-feira",
    THURSDAY: "Quinta-feira",
    FRIDAY: "Sexta-feira",
    SATURDAY: "Sábado",
    SUNDAY: "Domingo",
  },
  favorites: {
    title: "Favoritos",
    count: {
      one: "{{count}} estação salva",
      other: "{{count}} estações salvas",
    },
    none: "Nenhuma estação favoritada",
    empty: "Nenhum favorito ainda",
    emptyHint: "Toque na estrela de uma estação para salvá-la aqui",
    removeTitle: "Deseja remover dos favoritos?",
    removeMessage:
      'Ao remover, "{{name}}" deixará de estar na sua lista de favoritos.',
    distance: "{{distance}} km de você",
    sortRecent: "Recentes",
    sortNearest: "Mais perto",
  },
  scan: {
    title: "Escanear carregador",
    subtitle: "Aponte a câmera para o QR code ou código de barras do carregador",
    noPermission: "Sem permissão para usar a câmera.",
    grantPermission: "Clique aqui para dar a permissão",
    typeCode: "Digitar o código",
    codeRead: "Código lido",
    headerTitle: "Escanear QR Code",
    headerSubtitle: "Escaneie para iniciar o carregamento",
  },
  scanCode: {
    headerTitle: "Código manual",
    headerSubtitle: "Inserir manualmente",
    description: "Informe o código do plug para iniciar a recarga",
    label: "Código do plug fixado no carregador",
  },
  recharges: {
    title: "Recargas",
    subtitle: "Histórico e agendamentos",
    totalCharged: "Total carregado",
    totalTime: "Tempo total",
    totalSpent: "Gasto total",
    recent: "Histórico recente",
    empty: "Nenhuma recarga encontrada",
    status: {
      success: "Concluída",
      info: "Agendada",
      warning: "Pendente",
      danger: "Erro",
      default: "—",
    },
  },
  notifications: {
    title: "Notificações",
    unread: {
      one: "{{count}} não lida",
      other: "{{count}} não lidas",
    },
    allRead: "Todas lidas",
    allDoneTitle: "Tudo certo",
    allDoneMessage: "Todas as notificações foram marcadas como lidas.",
    markAll: "Marcar todas",
    empty: "Sem notificações",
    upToDate: "Você está em dia",
    // Abreviações dos meses, separadas por "|"
    months: "JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ",
  },
  vehicles: {
    title: "Veículos",
    subtitle: "Gerencie seus carros cadastrados",
    deleteTitle: "Excluir veículo",
    deleteMessage: "Deseja remover este veículo da sua conta?",
    empty: "Nenhum veículo cadastrado",
    emptyHint: "Adicione seu primeiro veículo para começar",
    newVehicle: "Novo veículo",
    plate: "Placa",
  },
  newVehicle: {
    headerTitle: "Novo veículo",
    headerSubtitle: "Adicione um carro à sua conta",
    title: "Cadastre seu veículo",
    subtitle:
      "Adicione os dados do seu carro para encontrar recargas compatíveis com mais facilidade.",
    name: "Nome do veículo",
    namePlaceholder: "Ex.: Dolphin Mini",
    brand: "Marca",
    brandPlaceholder: "Ex.: BYD",
    plate: "Placa",
    platePlaceholder: "Ex.: ABC1D23",
    fillAll: "Preencha todos os campos para continuar.",
    save: "Salvar veículo",
  },
  report: {
    description: "Descrição",
    selectType: "Selecione o tipo de problema.",
    minDescription:
      "Descreva o problema com pelo menos {{min}} caracteres.",
    station: {
      headerTitle: "Relatar problema",
      headerSubtitle: "Avise sobre falhas nesta estação",
      intro:
        "Conte o que aconteceu nesta estação. Seu relato ajuda outros motoristas e a manter os carregadores funcionando.",
      noStation:
        "Nenhuma estação selecionada. Volte e escolha uma estação no mapa.",
      typeLabel: "Tipo de problema",
      placeholder: "Descreva o que aconteceu...",
      send: "Enviar relato",
      types: {
        DEFEITO: "Carregador com defeito",
        OCUPADA: "Vaga ocupada ou bloqueada",
        CONECTOR: "Conector incompatível",
        PAGAMENTO: "Problema no pagamento",
        OUTRO: "Outro",
      },
    },
    app: {
      headerTitle: "Reportar problema",
      headerSubtitle: "Erros ou falhas no app",
      intro:
        "Encontrou um erro ou algo não funcionou como esperado? Conte para a gente o que aconteceu.",
      typeLabel: "O que aconteceu?",
      placeholder: "O que você estava fazendo quando o problema aconteceu?",
      deviceInfo:
        "Versão {{version}} · {{platform}} será enviada junto para ajudar a investigar.",
      types: {
        ERRO: "Erro ou travamento",
        NAO_FUNCIONA: "Algo não funciona",
        LENTIDAO: "App lento",
        CONTA: "Conta ou login",
        OUTRO: "Outro",
      },
    },
  },
  menu: {
    premiumMember: "Membro Premium",
    stats: {
      kwhTotal: "kWh total",
      recharges: "recargas",
      co2Avoided: "tCO₂ evitado",
    },
    sections: {
      account: "Conta",
      preferences: "Preferências",
      support: "Suporte",
    },
    items: {
      myVehicle: "Meu veículo",
      payments: "Pagamentos",
      referrals: "Indicações",
      referralsSub: "Convide amigos",
      settings: "Configurações",
      helpCenter: "Central de ajuda",
      reportProblem: "Reportar problema",
      reportProblemSub: "Erros ou falhas no app",
      terms: "Termos e privacidade",
      about: "Sobre o app",
      signOut: "Sair da conta",
      deleteAccount: "Excluir conta",
    },
    signOutConfirm: "Realmente deseja sair do aplicativo?",
  },
  settings: {
    title: "Configurações",
    subtitle: "Ajuste as preferências do App.",
    sections: {
      permissions: "Permissões",
      preferences: "Preferências",
    },
    location: "Localização",
    locationSub: "Encontrar estações perto de você",
    camera: "Câmera",
    cameraSub: "Tirar foto do seu veículo",
    notifications: "Notificações",
    notificationsSub: "Avisos de recargas e pagamentos",
    language: "Idioma",
    theme: "Tema",
    themeDark: "Escuro",
    permissionRequired: "Permissão necessária",
    permissionRequiredMessage:
      "Ative o acesso às permissões nas configurações do aplicativo.",
    openSettings: "Abrir Configurações",
    changePermission: "Alterar permissão",
    changePermissionMessage:
      "Para desativar esta permissão, vá para as configurações do aplicativo no seu dispositivo.",
    goToSettings: "Ir para configurações",
  },
  language: {
    title: "Idioma",
    subtitle: "Idioma do aplicativo",
    description: "Escolha o idioma em que o aplicativo será exibido.",
    names: {
      "pt-BR": "Português (Brasil)",
      "pt-PT": "Português (Portugal)",
      "en-US": "Inglês (Estados Unidos)",
      "zh-CN": "Chinês simplificado",
      "ru-RU": "Russo",
    },
  },
  about: {
    title: "Sobre o app",
    subtitle: "Informações do aplicativo",
    description:
      "Encontre estações de recarga perto de você, acompanhe suas recargas e gerencie seus veículos elétricos em um só lugar.",
    info: "Informações",
    version: "Versão",
    platform: "Plataforma",
    rights: "Todos os direitos reservados.",
  },
};

// Formas de plural aceitas (o russo usa few/many; o resto, one/other)
export type PluralForms = {
  one: string;
  other: string;
  zero?: string;
  few?: string;
  many?: string;
};

type LocaleShape<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends { one: string; other: string }
      ? PluralForms
      : LocaleShape<T[K]>;
};

export type Translations = LocaleShape<typeof ptBR>;

export default ptBR;
