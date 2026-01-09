import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from 'lucide-vue-next'

/**
 * 侧边栏配置
 * 你可以在这里修改侧边栏的内容，包括团队信息、用户信息、导航菜单和项目列表
 * 
 * 团队权限配置说明:
 * - permissions.navMain: 'all' 表示可以看到所有主导航，或者指定导航 id 数组
 * - permissions.navItems: 可选，细粒度控制某个导航下的子项，格式为 { 导航id: [子项id数组] }
 * - permissions.projects: 'all' 表示可以看到所有项目，或者指定项目 id 数组
 * 
 * 导航项配置说明:
 * - id: 导航项唯一标识，用于权限控制
 * - title: 导航项标题
 * - icon: 导航项图标（Lucide Vue Next 图标）
 * - defaultOpen: 初始化时是否展开该导航项（默认为 false）
 * - items: 子导航项列表
 */
export const sidebarConfig = {
    // 用户信息
    user: {
        name: '家乐',
        email: '2063994160@qq.com',
        avatar: '',
    },

    // 团队列表（包含权限配置）
    teams: [
        {
            name: '财务数据中心',
            logo: GalleryVerticalEnd,
            plan: '点击此处可切换角色',
            // 超级管理员 - 可以看到所有
            permissions: {
                navMain: 'all',
                projects: 'all'
            }
        },
        {
            name: '财务部',
            logo: AudioWaveform,
            plan: '财务BI',
            // 财务部 - 经营仓(3个)、数据看板(2个)、文档(数据字典+用户手册)
            permissions: {
                navMain: ['workspace', 'report', 'dashboard'],
                projects: ['data-dictionary', 'user-manual']
            }
        },
        {
            name: 'IT部',
            logo: Command,
            plan: '运维管理',
            // IT部 - 权限中心、系统设置、文档(仅用户手册)
            permissions: {
                navMain: ['rbac', 'settings'],
                projects: ['user-manual']
            }
        },
        {
            name: '公司经营分析',
            logo: Command,
            plan: '数据分析',
            // 分析员 - 经营仓(仅公司经营仓)、数据看板(所有)
            permissions: {
                navMain: ['report', 'dashboard'],
                navItems: {
                    // 细粒度控制：经营仓下只显示公司经营仓
                    'report': ['company']
                    // dashboard 没有配置，表示显示该导航下的所有子项
                },
                projects: []  // 不显示任何文档
            }
        },
    ],

    // 主导航菜单
    navMain: [
        {
            id: 'workspace',
            title: '工作台',
            url: '#',
            icon: SquareTerminal,
            defaultOpen: true, // 默认展开
            items: [
                {
                    id: 'todo',
                    title: '待办清单',
                    url: '#',
                },
                {
                    id: 'history',
                    title: '历史记录',
                    url: '#',
                },
            ],
        },
        {
            id: 'report',
            title: '经营仓',
            url: '#',
            icon: Bot,
            defaultOpen: true,
            items: [
                {
                    id: 'company',
                    title: '公司经营仓',
                    url: '#',
                },
                {
                    id: 'ameba',
                    title: '阿米巴经营仓',
                    url: '#',
                },
                {
                    id: 'store',
                    title: '店铺经营仓',
                    url: '#',
                },
            ],
        },
        {
            id: 'dashboard',
            title: '数据看板',
            url: '#',
            icon: BookOpen,
            defaultOpen: true,
            items: [
                {
                    id: 'self-service-bi',
                    title: '自助报表',
                    url: '#',
                },
                {
                    id: 'comparison',
                    title: '对比分析',
                    url: '#',
                },
            ],
        },
        {
            id: 'rbac',
            title: '权限中心',
            url: '#',
            icon: Settings2,
            defaultOpen: false, // 默认收起
            items: [
                {
                    id: 'user',
                    title: '用户管理',
                    url: '#',
                },
                {
                    id: 'role',
                    title: '角色管理',
                    url: '#',
                },
                {
                    id: 'permission',
                    title: '权限配置',
                    url: '#',
                },
                {
                    id: 'apply',
                    title: '权限申请',
                    url: '#',
                },
                {
                    id: 'log',
                    title: '操作日志',
                    url: '#',
                },
            ],
        },
        {
            id: 'settings',
            title: '系统设置',
            url: '#',
            icon: Settings2,
            defaultOpen: false, // 默认收起
            items: [
                {
                    id: 'dimension',
                    title: '配置管理',
                    url: '#',
                },
                {
                    id: 'notification',
                    title: '通知设置',
                    url: '#',
                },
            ],
        },
    ],

    // 项目列表（文档）
    projects: [
        {
            id: 'data-dictionary',
            name: '数据字典',
            url: '#',
            icon: Frame,
        },
        {
            id: 'user-manual',
            name: '用户操作手册',
            url: '#',
            icon: PieChart,
        },
    ],
}
