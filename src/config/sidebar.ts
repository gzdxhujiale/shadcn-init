import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,

    PieChart,
    Settings2,
    SquareTerminal,
    type LucideIcon,
} from 'lucide-vue-next'

// ============================================
// 类型定义
// ============================================

export interface NavSubItem {
    id: string
    title: string
    url: string
    badge?: string // 可选徽章
}

export interface NavMainItem {
    id: string
    title: string
    url: string
    icon?: LucideIcon
    /**
     * @deprecated 请使用 isOpen 代替
     */
    isActive?: boolean
    /**
     * 一级菜单是否默认展开
     */
    isOpen?: boolean
    items?: NavSubItem[]
}

export interface NavGroup {
    id?: string
    label: string
    items: NavMainItem[]
}

export interface ProjectItem {
    id: string
    name: string
    url: string
    icon: LucideIcon
}

export interface ProjectGroup {
    id?: string
    label: string
    projects: ProjectItem[]
    showMoreButton?: boolean
}

export interface TeamPermissions {
    navMain: 'all' | string[]
    projects: 'all' | string[]
    /**
     * 细粒度控制某个导航下的子项
     * 格式: { 导航id: [子项id数组] }
     */
    navItems?: Record<string, string[]>
}

export interface TeamItem {
    name: string
    logo: LucideIcon
    plan: string
    permissions: TeamPermissions
}

export interface UserInfo {
    name: string
    email: string
    avatar: string
}

export interface SidebarConfig {
    user: UserInfo
    teams: TeamItem[]
    navGroups: NavGroup[]
    projectGroups: ProjectGroup[]
}

// ============================================
// 默认配置数据
// ============================================

export const defaultSidebarConfig: SidebarConfig = {
    user: {
        name: 'HJL',
        email: '2063994160@qq.com',
        avatar: '/avatars/shadcn.jpg',
    },

    teams: [
        {
            name: '财务数据中心',
            logo: GalleryVerticalEnd,
            plan: '点击此处可切换角色',
            permissions: {
                navMain: 'all',
                projects: 'all'
            }
        },
        {
            name: '财务部',
            logo: AudioWaveform,
            plan: '财务BI',
            permissions: {
                navMain: ['workspace', 'report', 'dashboard'],
                projects: ['data-dictionary', 'user-manual']
            }
        },
        {
            name: 'IT部',
            logo: Command,
            plan: '运维管理',
            permissions: {
                navMain: ['rbac', 'settings'],
                projects: ['user-manual']
            }
        },
        {
            name: '公司经营分析',
            logo: Command,
            plan: '数据分析',
            permissions: {
                navMain: ['report', 'dashboard'],
                navItems: {
                    'report': ['company']
                },
                projects: []
            }
        },
    ],

    navGroups: [
        {
            label: '平台',
            items: [
                {
                    id: 'workspace',
                    title: '工作台',
                    url: '#',
                    icon: SquareTerminal,
                    isOpen: true, // 设置为 true 则默认展开
                    items: [
                        { id: 'todo', title: '待办清单', url: '#' },
                        { id: 'history', title: '历史记录', url: '#' },
                    ],
                },
                {
                    id: 'report',
                    title: '经营仓',
                    url: '#',
                    icon: Bot,
                    isOpen: true,
                    items: [
                        { id: 'company', title: '公司经营仓', url: '#' },
                        { id: 'ameba', title: '阿米巴经营仓', url: '#' },
                        { id: 'store', title: '店铺经营仓', url: '#' },
                    ],
                },
                {
                    id: 'dashboard',
                    title: '自助分析',
                    url: '#',
                    icon: BookOpen,
                    isOpen: true,
                    items: [
                        { id: 'self-service-bi', title: '数据看板', url: '#' },
                        { id: 'comparison', title: '对比分析', url: '#' },
                    ],
                },
                {
                    id: 'rbac',
                    title: '权限管理',
                    url: '#',
                    icon: Settings2,
                    isOpen: false,
                    items: [
                        { id: 'user', title: '用户管理', url: '#' },
                        { id: 'role', title: '角色管理', url: '#' },
                        { id: 'permission', title: '权限管理', url: '#' },
                        { id: 'apply', title: '权限申请', url: '#' },
                        { id: 'log', title: '操作日志', url: '#' },
                    ],
                },
                {
                    id: 'settings',
                    title: '系统设置',
                    url: '#',
                    icon: Settings2,
                    isOpen: false,
                    items: [
                        { id: 'dimension', title: '配置管理', url: '#' },
                        { id: 'notification', title: '通知设置', url: '#' },
                    ],
                },
            ],
        },
    ],

    projectGroups: [
        {
            label: '文档',
            showMoreButton: true,
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
        },
    ],
}

// ============================================
// 配置管理函数
// ============================================

/**
 * 合并用户配置与默认配置
 */
export function mergeSidebarConfig(
    customConfig: Partial<SidebarConfig>
): SidebarConfig {
    return {
        ...defaultSidebarConfig,
        ...customConfig,
        // 深度合并数组类型的字段
        navGroups: customConfig.navGroups ?? defaultSidebarConfig.navGroups,
        projectGroups: customConfig.projectGroups ?? defaultSidebarConfig.projectGroups,
        teams: customConfig.teams ?? defaultSidebarConfig.teams,
    }
}

/**
 * 创建导航项
 */
/**
 * 创建导航项
 */
export function createNavItem(
    id: string,
    title: string,
    url: string,
    icon?: LucideIcon,
    subItems?: NavSubItem[],
    isActive = false
): NavMainItem {
    return {
        id,
        title,
        url,
        icon,
        isActive,
        items: subItems,
    }
}

/**
 * 创建导航分组
 */
export function createNavGroup(label: string, items: NavMainItem[], id?: string): NavGroup {
    return { id, label, items }
}

/**
 * 创建项目项
 */
export function createProjectItem(
    id: string,
    name: string,
    url: string,
    icon: LucideIcon
): ProjectItem {
    return { id, name, url, icon }
}

/**
 * 创建项目分组
 */
export function createProjectGroup(
    label: string,
    projects: ProjectItem[],
    showMoreButton = true,
    id?: string
): ProjectGroup {
    return { id, label, projects, showMoreButton }
}
