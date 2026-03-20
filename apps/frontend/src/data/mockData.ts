import type {
  IApp,
  IAppDetail,
  ITestimonial,
  ICourse,
  IGlobalMetric,
  AppCategory,
  LifecyclePhase,
  CitizenTier,
} from '@portal/shared';

// ============================================================
// GLOBAL METRICS
// ============================================================
export const MOCK_METRICS: IGlobalMetric[] = [
  {
    id: '1',
    key: 'active_users',
    label: 'Makers Ativos',
    value: '339',
    suffix: '+',
    icon: 'users',
  },
  {
    id: '2',
    key: 'apps_catalog',
    label: 'Apps no Catalogo',
    value: '80',
    suffix: '+',
    icon: 'layers',
  },
  {
    id: '3',
    key: 'environments',
    label: 'Ambientes Gerenciados',
    value: '72',
    icon: 'server',
  },
  {
    id: '4',
    key: 'regions',
    label: 'Regionais Atendidas',
    value: '15',
    suffix: '+',
    icon: 'building',
  },
];

// ============================================================
// APPS
// ============================================================
export const MOCK_APPS: IApp[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567801',
    name: 'PipaeA',
    slug: 'pipaea',
    description:
      'Sistema integrado de gestao de frota e abastecimento de agua, conectando equipes de campo com a central de operacoes em tempo real. Otimiza rotas, reduz custos operacionais e melhora o tempo de resposta para atendimentos emergenciais.',
    shortDescription:
      'Gestao de frota e abastecimento de agua com rastreamento em tempo real.',
    category: 'OPERACIONAL' as AppCategory,
    lifecyclePhase: 'MELHORIA_CONTINUA' as LifecyclePhase,
    owner: 'Gerencia de Operacoes',
    businessUnit: 'Corporativo',
    platform: 'Power Apps',
    hasSensitiveData: false,
    isPublished: true,
    bannerUrl:
      'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=800&q=80',
    iconUrl:
      'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=100&q=80',
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567802',
    name: 'Portal da Viabilidade Tecnica',
    slug: 'portal-viabilidade-tecnica',
    description:
      'Portal para analise de viabilidade tecnica de novos empreendimentos e ligacoes de agua e esgoto. Centraliza solicitacoes, automatiza pareceres tecnicos e reduz o prazo de resposta ao cliente final.',
    shortDescription:
      'Analise de viabilidade tecnica para novos empreendimentos e ligacoes.',
    category: 'COMERCIAL' as AppCategory,
    lifecyclePhase: 'PROJETO' as LifecyclePhase,
    owner: 'Diretoria Comercial',
    businessUnit: 'Corporativo',
    platform: 'Power Apps',
    hasSensitiveData: false,
    isPublished: true,
    bannerUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    iconUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&q=80',
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567803',
    name: 'Plataforma de Gestao de Mao de Obra',
    slug: 'gestao-mao-de-obra',
    description:
      'Plataforma para gestao completa de equipes operacionais em campo, incluindo alocacao de recursos, controle de ordens de servico e monitoramento de produtividade. Reduz retrabalho e otimiza a distribuicao de tarefas.',
    shortDescription:
      'Gestao de equipes operacionais e ordens de servico em campo.',
    category: 'OPERACIONAL' as AppCategory,
    lifecyclePhase: 'DEMANDA' as LifecyclePhase,
    owner: 'Gerencia de Manutencao',
    businessUnit: 'Corporativo',
    platform: 'Power Apps',
    hasSensitiveData: false,
    isPublished: true,
    bannerUrl:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
    iconUrl:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=100&q=80',
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567804',
    name: 'App Registro de Sensores ETE/ETA/URE',
    slug: 'registro-sensores',
    description:
      'Aplicativo para registro e monitoramento de sensores em Estacoes de Tratamento de Agua (ETA), Esgoto (ETE) e Reuso (URE). Digitaliza o processo de leitura, elimina planilhas manuais e garante rastreabilidade dos dados operacionais.',
    shortDescription:
      'Registro e monitoramento de sensores em estacoes de tratamento.',
    category: 'OPERACIONAL' as AppCategory,
    lifecyclePhase: 'MELHORIA_CONTINUA' as LifecyclePhase,
    owner: 'Gerencia de Tratamento',
    businessUnit: 'Corporativo',
    platform: 'Power Apps',
    hasSensitiveData: false,
    isPublished: true,
    bannerUrl:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    iconUrl:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=100&q=80',
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567805',
    name: 'Central de Compras Corporativa',
    slug: 'central-compras',
    description:
      'Sistema centralizado de compras corporativas que unifica solicitacoes de todas as regionais, padroniza processos de cotacao e aprovacao, e gera economia de escala por meio de negociacoes consolidadas.',
    shortDescription:
      'Sistema centralizado de compras e cotacoes corporativas.',
    category: 'GESTAO' as AppCategory,
    lifecyclePhase: 'INICIATIVA' as LifecyclePhase,
    owner: 'Gerencia de Suprimentos',
    businessUnit: 'Corporativo',
    platform: 'Power Apps',
    hasSensitiveData: false,
    isPublished: true,
    bannerUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    iconUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&q=80',
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567806',
    name: 'Norma - Release II',
    slug: 'norma-release-ii',
    description:
      'Segunda versao do sistema de gestao de normas e procedimentos internos. Automatiza o ciclo de vida de documentos normativos, controla versoes, aprovacoes e garante conformidade regulatoria em todas as operacoes.',
    shortDescription:
      'Gestao de normas e procedimentos com controle de versoes.',
    category: 'GOVERNANCA' as AppCategory,
    lifecyclePhase: 'DEMANDA' as LifecyclePhase,
    owner: 'Gerencia de Compliance',
    businessUnit: 'Corporativo',
    platform: 'Power Apps',
    hasSensitiveData: false,
    isPublished: true,
    bannerUrl:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    iconUrl:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=100&q=80',
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567807',
    name: 'Otimizacao de CAPEX - Obras de Rede',
    slug: 'otimizacao-capex',
    description:
      'Solucao para otimizacao do investimento em obras de rede de agua e esgoto. Prioriza projetos com base em indicadores tecnicos e financeiros, melhorando a alocacao de capital e o retorno sobre investimento.',
    shortDescription:
      'Otimizacao de investimentos em obras de rede de agua e esgoto.',
    category: 'FINANCEIRO' as AppCategory,
    lifecyclePhase: 'DEMANDA' as LifecyclePhase,
    owner: 'Diretoria Financeira',
    businessUnit: 'Corporativo',
    platform: 'Power Apps',
    hasSensitiveData: true,
    isPublished: true,
    bannerUrl:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    iconUrl:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&q=80',
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567808',
    name: 'IA Cadastro de Ativos',
    slug: 'ia-cadastro-ativos',
    description:
      'Solucao baseada em Inteligencia Artificial para cadastro automatizado de ativos operacionais. Utiliza visao computacional e processamento de linguagem natural para classificar e registrar equipamentos, reduzindo erros e tempo de cadastro.',
    shortDescription:
      'Cadastro automatizado de ativos com Inteligencia Artificial.',
    category: 'OPERACIONAL' as AppCategory,
    lifecyclePhase: 'INICIATIVA' as LifecyclePhase,
    owner: 'Gerencia de Ativos',
    businessUnit: 'Corporativo',
    platform: 'Power Apps + AI Builder',
    hasSensitiveData: false,
    isPublished: true,
    bannerUrl:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    iconUrl:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&q=80',
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================
export const MOCK_TESTIMONIALS: ITestimonial[] = [
  {
    id: 't1',
    appId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567801',
    appName: 'PipaeA',
    authorName: 'Carlos Mendes',
    authorRole: 'Coordenador de Operacoes',
    authorUnit: 'Regional Sao Paulo',
    content:
      'O PipaeA revolucionou a forma como gerenciamos os processos operacionais. Ganhamos agilidade e visibilidade em tempo real das nossas equipes em campo.',
    rating: 5,
    isPublished: true,
    createdAt: '2025-11-15T10:00:00Z',
  },
  {
    id: 't2',
    appId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567801',
    appName: 'PipaeA',
    authorName: 'Fernanda Rodrigues',
    authorRole: 'Supervisora de Campo',
    authorUnit: 'Regional Rio de Janeiro',
    content:
      'Desde que comecamos a usar o PipaeA, nosso tempo de resposta para atendimentos emergenciais caiu drasticamente. A equipe de campo agora tem todas as informacoes na palma da mao.',
    rating: 5,
    isPublished: true,
    createdAt: '2025-12-01T14:30:00Z',
  },
  {
    id: 't3',
    appId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567802',
    appName: 'Portal da Viabilidade Tecnica',
    authorName: 'Ana Lucia Ferreira',
    authorRole: 'Analista de Engenharia',
    authorUnit: 'Corporativo',
    content:
      'O Portal de Viabilidade nos permite analisar novos projetos de forma estruturada e com dados confiaveis. Reduzimos o prazo de resposta em mais de 60%.',
    rating: 5,
    isPublished: true,
    createdAt: '2025-10-20T09:00:00Z',
  },
  {
    id: 't4',
    appId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567802',
    appName: 'Portal da Viabilidade Tecnica',
    authorName: 'Ricardo Almeida',
    authorRole: 'Gerente de Novos Negocios',
    authorUnit: 'Regional Minas Gerais',
    content:
      'A automacao do parecer tecnico nos deu velocidade para fechar novos contratos. O portal e intuitivo e a equipe adotou rapidamente.',
    rating: 5,
    isPublished: true,
    createdAt: '2025-11-05T11:00:00Z',
  },
  {
    id: 't5',
    appId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567803',
    appName: 'Plataforma de Gestao de Mao de Obra',
    authorName: 'Roberto Silva',
    authorRole: 'Gerente Regional',
    authorUnit: 'Regional Sul',
    content:
      'A Gestao de Mao de Obra trouxe transparencia e eficiencia no controle de equipes em campo. Reduzimos retrabalho significativamente e ganhamos produtividade.',
    rating: 5,
    isPublished: true,
    createdAt: '2025-09-12T08:00:00Z',
  },
  {
    id: 't6',
    appId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567803',
    appName: 'Plataforma de Gestao de Mao de Obra',
    authorName: 'Luciana Martins',
    authorRole: 'Coordenadora de Manutencao',
    authorUnit: 'Regional Nordeste',
    content:
      'Antes tinhamos dificuldade em acompanhar as ordens de servico. Agora, com a plataforma, temos visao completa do status de cada equipe e atividade.',
    rating: 5,
    isPublished: true,
    createdAt: '2025-10-01T15:00:00Z',
  },
  {
    id: 't7',
    appId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567804',
    appName: 'App Registro de Sensores ETE/ETA/URE',
    authorName: 'Patricia Almeida',
    authorRole: 'Especialista em Tratamento',
    authorUnit: 'Regional Centro-Oeste',
    content:
      'O app de sensores eliminou completamente nossas planilhas manuais. A rastreabilidade dos dados agora e impecavel e temos historico confiavel para auditorias.',
    rating: 5,
    isPublished: true,
    createdAt: '2025-08-20T10:00:00Z',
  },
  {
    id: 't8',
    appId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567804',
    appName: 'App Registro de Sensores ETE/ETA/URE',
    authorName: 'Marcos Oliveira',
    authorRole: 'Operador de ETA',
    authorUnit: 'Regional Norte',
    content:
      'Registro os dados dos sensores direto pelo celular, mesmo em areas com sinal fraco. O app sincroniza automaticamente quando volta a conexao. Muito pratico.',
    rating: 5,
    isPublished: true,
    createdAt: '2025-09-05T07:30:00Z',
  },
  {
    id: 't9',
    appId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567804',
    appName: 'App Registro de Sensores ETE/ETA/URE',
    authorName: 'Juliana Costa',
    authorRole: 'Coordenadora de Qualidade',
    authorUnit: 'Corporativo',
    content:
      'Os dashboards em tempo real dos sensores nos permitem agir preventivamente. A qualidade do tratamento melhorou e temos dados para comprovar.',
    rating: 5,
    isPublished: true,
    createdAt: '2025-10-10T13:00:00Z',
  },
];

// ============================================================
// APP DETAILS
// ============================================================
export const MOCK_APP_DETAILS: Record<string, IAppDetail> = {
  pipaea: {
    ...MOCK_APPS[0],
    painPoint:
      'Falta de visibilidade em tempo real das equipes de campo, rotas ineficientes e alto custo operacional com frota e deslocamentos desnecessarios.',
    objective:
      'Criar uma plataforma integrada que conecte equipes de campo com a central de operacoes, otimizando rotas e reduzindo custos operacionais.',
    hasParentChildArch: false,
    hasHumanInteraction: true,
    relatedFlowsCount: 3,
    systemsInvolved: 'SAP, GPS Tracker, Power Automate',
    benefits: [
      {
        id: 'b1-1',
        title: 'Reducao de custos operacionais',
        description:
          'Economia de 25% nos custos de frota e deslocamento com otimizacao de rotas inteligente.',
      },
      {
        id: 'b1-2',
        title: 'Monitoramento em tempo real',
        description:
          'Visibilidade completa das equipes em campo com rastreamento GPS e status atualizado.',
      },
      {
        id: 'b1-3',
        title: 'Reducao no tempo de resposta',
        description:
          'Diminuicao de 30% no tempo de atendimento a emergencias com despacho inteligente.',
      },
      {
        id: 'b1-4',
        title: 'Digitalizacao de processos',
        description:
          'Eliminacao de formularios em papel e planilhas manuais de controle de frota.',
      },
      {
        id: 'b1-5',
        title: 'Melhoria na satisfacao do cliente',
        description:
          'Atendimentos mais rapidos e eficientes resultam em maior satisfacao dos usuarios finais.',
      },
    ],
    documents: [
      {
        id: 'd1-1',
        type: 'VIDEO',
        title: 'PipaeA - Demonstracao Completa',
        url: '#',
        description:
          'Video demonstrativo com todas as funcionalidades do sistema PipaeA.',
      },
      {
        id: 'd1-2',
        type: 'MANUAL',
        title: 'Manual do Usuario - PipaeA',
        url: '#',
        description:
          'Guia completo para utilizacao do sistema no dia a dia operacional.',
      },
      {
        id: 'd1-3',
        type: 'INSTRUCTION',
        title: 'Instrucoes de Configuracao Inicial',
        url: '#',
        description:
          'Passo a passo para configurar o PipaeA na sua regional.',
      },
    ],
    testimonials: MOCK_TESTIMONIALS.filter(
      (t) => t.appId === 'a1b2c3d4-e5f6-7890-abcd-ef1234567801'
    ),
    metrics: [
      { id: 'm1-1', label: 'Reducao de Custos', value: '25%' },
      { id: 'm1-2', label: 'Tempo de Resposta', value: '-30%' },
      { id: 'm1-3', label: 'Usuarios Ativos', value: '150+' },
      { id: 'm1-4', label: 'Atendimentos/Mes', value: '2.500+' },
    ],
    relatedFlows: [
      { id: 'f1-1', name: 'Fluxo de Despacho de Equipes' },
      { id: 'f1-2', name: 'Notificacao de Emergencia' },
      { id: 'f1-3', name: 'Sincronizacao com SAP' },
    ],
  },

  'portal-viabilidade-tecnica': {
    ...MOCK_APPS[1],
    painPoint:
      'Processo manual e demorado de analise de viabilidade tecnica, com prazos longos que impactam negativamente a experiencia do cliente e a captacao de novos negocios.',
    objective:
      'Automatizar e centralizar o processo de viabilidade tecnica, reduzindo prazos e melhorando a qualidade dos pareceres.',
    hasParentChildArch: false,
    hasHumanInteraction: true,
    relatedFlowsCount: 2,
    systemsInvolved: 'GIS, SAP, SharePoint',
    benefits: [
      {
        id: 'b2-1',
        title: 'Reducao de 60% no prazo de analise',
        description:
          'Pareceres tecnicos emitidos em ate 3 dias uteis, contra 7 dias do processo anterior.',
      },
      {
        id: 'b2-2',
        title: 'Centralizacao das solicitacoes',
        description:
          'Todas as solicitacoes em um unico portal, com rastreabilidade completa.',
      },
      {
        id: 'b2-3',
        title: 'Padronizacao dos pareceres',
        description:
          'Templates e criterios padronizados garantem consistencia nas analises.',
      },
      {
        id: 'b2-4',
        title: 'Satisfacao do cliente',
        description:
          'Indice de satisfacao de 98% com o novo processo de viabilidade.',
      },
    ],
    documents: [
      {
        id: 'd2-1',
        type: 'VIDEO',
        title: 'Portal Viabilidade - Tour Guiado',
        url: '#',
        description:
          'Conheca todas as funcionalidades do portal em um tour interativo.',
      },
      {
        id: 'd2-2',
        type: 'MANUAL',
        title: 'Manual de Uso do Portal',
        url: '#',
        description:
          'Documentacao completa para analistas e gestores.',
      },
    ],
    testimonials: MOCK_TESTIMONIALS.filter(
      (t) => t.appId === 'a1b2c3d4-e5f6-7890-abcd-ef1234567802'
    ),
    metrics: [
      { id: 'm2-1', label: 'Reducao de Prazo', value: '60%' },
      { id: 'm2-2', label: 'Solicitacoes/Mes', value: '350+' },
      { id: 'm2-3', label: 'Satisfacao', value: '98%' },
      { id: 'm2-4', label: 'Tempo Medio', value: '3 dias' },
    ],
    relatedFlows: [
      { id: 'f2-1', name: 'Fluxo de Aprovacao de Viabilidade' },
      { id: 'f2-2', name: 'Notificacao ao Solicitante' },
    ],
  },

  'gestao-mao-de-obra': {
    ...MOCK_APPS[2],
    painPoint:
      'Dificuldade em acompanhar equipes em campo, alto indice de retrabalho e falta de visibilidade sobre produtividade e alocacao de recursos.',
    objective:
      'Implementar plataforma integrada para gestao de equipes operacionais, com controle de OS, alocacao inteligente e indicadores de produtividade.',
    hasParentChildArch: false,
    hasHumanInteraction: true,
    relatedFlowsCount: 2,
    systemsInvolved: 'SAP, Power Automate, Teams',
    benefits: [
      {
        id: 'b3-1',
        title: 'Aumento de 40% na produtividade',
        description:
          'Alocacao inteligente de equipes e eliminacao de deslocamentos desnecessarios.',
      },
      {
        id: 'b3-2',
        title: 'Reducao de 35% no retrabalho',
        description:
          'Instrucoes claras e checklist digital para cada ordem de servico.',
      },
      {
        id: 'b3-3',
        title: 'Visibilidade em tempo real',
        description:
          'Dashboard com status atualizado de todas as equipes e atividades.',
      },
      {
        id: 'b3-4',
        title: 'Gestao de 45 equipes simultaneas',
        description:
          'Capacidade de gerenciar multiplas equipes em diferentes regioes.',
      },
    ],
    documents: [
      {
        id: 'd3-1',
        type: 'VIDEO',
        title: 'Gestao de Mao de Obra - Overview',
        url: '#',
        description:
          'Visao geral da plataforma e seus principais recursos.',
      },
      {
        id: 'd3-2',
        type: 'INSTRUCTION',
        title: 'Guia Rapido para Supervisores',
        url: '#',
        description:
          'Instrucoes praticas para supervisores de equipes em campo.',
      },
    ],
    testimonials: MOCK_TESTIMONIALS.filter(
      (t) => t.appId === 'a1b2c3d4-e5f6-7890-abcd-ef1234567803'
    ),
    metrics: [
      { id: 'm3-1', label: 'Produtividade', value: '+40%' },
      { id: 'm3-2', label: 'Retrabalho', value: '-35%' },
      { id: 'm3-3', label: 'OS/Mes', value: '1.800+' },
      { id: 'm3-4', label: 'Equipes', value: '45' },
    ],
    relatedFlows: [
      { id: 'f3-1', name: 'Fluxo de Alocacao de Equipes' },
      { id: 'f3-2', name: 'Encerramento de OS Automatizado' },
    ],
  },

  'registro-sensores': {
    ...MOCK_APPS[3],
    painPoint:
      'Registros manuais em planilhas de papel, sem rastreabilidade, sujeitos a erros e perdas de dados. Dificuldade de auditar historicos operacionais das estacoes.',
    objective:
      'Digitalizar o processo de registro de sensores em estacoes de tratamento, garantindo rastreabilidade, confiabilidade e acesso em tempo real aos dados.',
    hasParentChildArch: false,
    hasHumanInteraction: true,
    relatedFlowsCount: 3,
    systemsInvolved: 'IoT Sensors, Power BI, Dataverse',
    benefits: [
      {
        id: 'b4-1',
        title: 'Cobertura de 68 estacoes',
        description:
          'Sistema implantado em todas as estacoes de tratamento da companhia.',
      },
      {
        id: 'b4-2',
        title: 'Reducao de 70% no tempo de registro',
        description:
          'Leitura digital substitui formularios em papel com ganho expressivo de tempo.',
      },
      {
        id: 'b4-3',
        title: 'Mais de 1.500 registros diarios',
        description:
          'Volume de dados processados diariamente com total rastreabilidade.',
      },
      {
        id: 'b4-4',
        title: 'Adocao de 95% das equipes',
        description:
          'Alta taxa de adocao gracas a interface intuitiva e funcionamento offline.',
      },
    ],
    documents: [
      {
        id: 'd4-1',
        type: 'VIDEO',
        title: 'Registro de Sensores - Tutorial',
        url: '#',
        description: 'Tutorial completo do app para operadores de estacao.',
      },
      {
        id: 'd4-2',
        type: 'MANUAL',
        title: 'Manual Operacional',
        url: '#',
        description:
          'Documentacao tecnica para configuracao e operacao do sistema.',
      },
      {
        id: 'd4-3',
        type: 'INSTRUCTION',
        title: 'Instrucoes de Calibracao',
        url: '#',
        description:
          'Guia para calibracao dos sensores e validacao dos registros.',
      },
    ],
    testimonials: MOCK_TESTIMONIALS.filter(
      (t) => t.appId === 'a1b2c3d4-e5f6-7890-abcd-ef1234567804'
    ),
    metrics: [
      { id: 'm4-1', label: 'Estacoes', value: '68' },
      { id: 'm4-2', label: 'Tempo de Registro', value: '-70%' },
      { id: 'm4-3', label: 'Registros/Dia', value: '1.500+' },
      { id: 'm4-4', label: 'Adocao', value: '95%' },
    ],
    relatedFlows: [
      { id: 'f4-1', name: 'Sincronizacao Offline/Online' },
      { id: 'f4-2', name: 'Alerta de Leitura Fora do Padrao' },
      { id: 'f4-3', name: 'Relatorio Automatico Diario' },
    ],
  },

  'central-compras': {
    ...MOCK_APPS[4],
    painPoint:
      'Processos de compras descentralizados nas regionais, sem padronizacao e sem aproveitamento de economia de escala nas negociacoes.',
    objective:
      'Centralizar e padronizar o processo de compras corporativas, gerando economia de escala e transparencia nos gastos.',
    hasParentChildArch: false,
    hasHumanInteraction: true,
    relatedFlowsCount: 1,
    systemsInvolved: 'SAP MM, SharePoint, Power Automate',
    benefits: [
      {
        id: 'b5-1',
        title: 'Centralizacao de solicitacoes',
        description:
          'Todas as compras de todas as regionais unificadas em um unico sistema.',
      },
      {
        id: 'b5-2',
        title: 'Economia de escala',
        description:
          'Negociacoes consolidadas com fornecedores para melhores precos e condicoes.',
      },
      {
        id: 'b5-3',
        title: 'Transparencia e compliance',
        description:
          'Rastreabilidade completa do processo de compras, da solicitacao ao pagamento.',
      },
    ],
    documents: [
      {
        id: 'd5-1',
        type: 'MANUAL',
        title: 'Manual do Sistema de Compras',
        url: '#',
        description:
          'Guia completo para solicitantes e aprovadores.',
      },
    ],
    testimonials: [],
    metrics: [],
    relatedFlows: [
      { id: 'f5-1', name: 'Fluxo de Aprovacao de Compras' },
    ],
  },

  'norma-release-ii': {
    ...MOCK_APPS[5],
    painPoint:
      'Gestao manual de normas e procedimentos, dificuldade de controlar versoes e garantir que todos os colaboradores estejam seguindo as versoes mais atualizadas.',
    objective:
      'Automatizar o ciclo de vida de documentos normativos com controle de versoes, workflow de aprovacao e distribuicao automatica.',
    hasParentChildArch: false,
    hasHumanInteraction: true,
    relatedFlowsCount: 0,
    systemsInvolved: 'SharePoint, Power Automate, Teams',
    benefits: [
      {
        id: 'b6-1',
        title: 'Controle de versoes automatizado',
        description:
          'Historico completo de todas as alteracoes em normas e procedimentos.',
      },
      {
        id: 'b6-2',
        title: 'Workflow de aprovacao',
        description:
          'Fluxo digital de revisao e aprovacao com notificacoes automaticas.',
      },
      {
        id: 'b6-3',
        title: 'Distribuicao automatica',
        description:
          'Normas atualizadas distribuidas automaticamente para os colaboradores afetados.',
      },
    ],
    documents: [],
    testimonials: [],
    metrics: [],
    relatedFlows: [],
  },

  'otimizacao-capex': {
    ...MOCK_APPS[6],
    painPoint:
      'Priorizacao subjetiva de investimentos em obras de rede, sem criterios padronizados e sem visibilidade do impacto financeiro e tecnico de cada projeto.',
    objective:
      'Criar modelo de priorizacao baseado em indicadores tecnicos e financeiros para otimizar a alocacao de capital em obras de rede.',
    hasParentChildArch: false,
    hasHumanInteraction: true,
    relatedFlowsCount: 0,
    systemsInvolved: 'SAP, Power BI, Excel',
    benefits: [
      {
        id: 'b7-1',
        title: 'Priorizacao baseada em dados',
        description:
          'Modelo de scoring com indicadores tecnicos e financeiros para ranking de projetos.',
      },
      {
        id: 'b7-2',
        title: 'Melhor alocacao de capital',
        description:
          'Investimentos direcionados para projetos com maior retorno e impacto operacional.',
      },
      {
        id: 'b7-3',
        title: 'Visibilidade do portfolio',
        description:
          'Dashboard completo com todas as obras planejadas, em execucao e concluidas.',
      },
    ],
    documents: [],
    testimonials: [],
    metrics: [],
    relatedFlows: [],
  },

  'ia-cadastro-ativos': {
    ...MOCK_APPS[7],
    painPoint:
      'Cadastro manual de ativos operacionais com alto indice de erros, inconsistencias e tempo excessivo para classificacao e registro de equipamentos.',
    objective:
      'Utilizar Inteligencia Artificial para automatizar o cadastro de ativos, reduzindo erros e acelerando o processo de registro.',
    hasParentChildArch: false,
    hasHumanInteraction: true,
    relatedFlowsCount: 2,
    systemsInvolved: 'AI Builder, Dataverse, SAP PM',
    benefits: [
      {
        id: 'b8-1',
        title: 'Acuracia de 89% na classificacao por IA',
        description:
          'Modelo de IA treinado com dados historicos para classificacao automatica de ativos.',
      },
      {
        id: 'b8-2',
        title: 'Reducao de 75% nos erros de cadastro',
        description:
          'Validacao automatica e sugestoes inteligentes reduzem inconsistencias.',
      },
      {
        id: 'b8-3',
        title: 'Cadastro 60% mais rapido',
        description:
          'Preenchimento automatico de campos com base em reconhecimento de imagem e texto.',
      },
      {
        id: 'b8-4',
        title: 'Mais de 2.500 ativos cadastrados',
        description:
          'Base consolidada de ativos operacionais com dados confiáveis e padronizados.',
      },
    ],
    documents: [],
    testimonials: [],
    metrics: [
      { id: 'm8-1', label: 'Acuracia IA', value: '89%' },
      { id: 'm8-2', label: 'Reducao de Erros', value: '-75%' },
      { id: 'm8-3', label: 'Tempo de Cadastro', value: '-60%' },
      { id: 'm8-4', label: 'Ativos Cadastrados', value: '2.500+' },
    ],
    relatedFlows: [
      { id: 'f8-1', name: 'Classificacao Automatica por IA' },
      { id: 'f8-2', name: 'Sincronizacao com SAP PM' },
    ],
  },
};

// ============================================================
// COURSES
// ============================================================
export const MOCK_COURSES: ICourse[] = [
  {
    id: 'c1',
    title: 'Introducao ao Power Apps Canvas',
    description:
      'Primeiros passos com Power Apps Canvas. Crie seu primeiro aplicativo do zero com exercicios praticos.',
    tier: 'T1_STARTER' as CitizenTier,
    format: 'Workshop',
    duration: '45 min',
    provider: 'Equipe CoE',
    isPublished: true,
  },
  {
    id: 'c2',
    title: 'Power Automate - Primeiros Passos',
    description:
      'Aprenda a criar fluxos automatizados para tarefas do dia a dia e integre com as ferramentas que voce ja usa.',
    tier: 'T1_STARTER' as CitizenTier,
    format: 'Hands-on',
    duration: '1 hora',
    provider: 'Equipe CoE',
    isPublished: true,
  },
  {
    id: 'c3',
    title: 'Formulas e Funcoes no Power Apps',
    description:
      'Domine as formulas essenciais para criar apps mais complexos e interativos com logica avancada.',
    tier: 'T2_STANDARD' as CitizenTier,
    format: 'Workshop',
    duration: '1h 30min',
    provider: 'Equipe CoE',
    isPublished: true,
  },
  {
    id: 'c4',
    title: 'Integracoes com SharePoint e Dataverse',
    description:
      'Conecte seus apps a fontes de dados corporativas como SharePoint, Dataverse e SQL Server.',
    tier: 'T2_STANDARD' as CitizenTier,
    format: 'Hands-on',
    duration: '2 horas',
    provider: 'Equipe CoE',
    isPublished: true,
  },
  {
    id: 'c5',
    title: 'Power Apps Component Framework (PCF)',
    description:
      'Crie componentes reutilizaveis com codigo customizado usando TypeScript e React.',
    tier: 'T3_ADVANCED' as CitizenTier,
    format: 'Workshop',
    duration: '3 horas',
    provider: 'Equipe CoE',
    isPublished: true,
  },
  {
    id: 'c6',
    title: 'Governanca e Boas Praticas',
    description:
      'Governanca, ALM, CI/CD e boas praticas para desenvolvedores avancados e Power Developers.',
    tier: 'T4_POWER_DEVELOPER' as CitizenTier,
    format: 'Palestra',
    duration: '2h 30min',
    provider: 'Equipe CoE',
    isPublished: true,
  },
];
