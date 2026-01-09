import { ref, computed } from 'vue'
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
    component?: string // 对应的页面组件名
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
    component?: string // 对应的页面组件名
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
                        { id: 'todo', title: '待办清单', url: '#', component: 'TodoList' },
                        { id: 'history', title: '历史记录', url: '#', component: 'History' },
                    ],
                },
                {
                    id: 'report',
                    title: '经营仓',
                    url: '#',
                    icon: Bot,
                    isOpen: true,
                    items: [
                        { id: 'company', title: '公司经营仓', url: '#', component: 'ReportCompany' },
                        { id: 'ameba', title: '阿米巴经营仓', url: '#', component: 'ReportAmeba' },
                        { id: 'store', title: '店铺经营仓', url: '#', component: 'ReportStore' },
                    ],
                },
                {
                    id: 'dashboard',
                    title: '自助分析',
                    url: '#',
                    icon: BookOpen,
                    isOpen: true,
                    items: [
                        { id: 'self-service-bi', title: '数据看板', url: '#', component: 'SelfServiceBi' },
                        { id: 'comparison', title: '对比分析', url: '#', component: 'DashboardCompare' },
                    ],
                },
                {
                    id: 'rbac',
                    title: '权限管理',
                    url: '#',
                    icon: Settings2,
                    isOpen: false,
                    items: [
                        { id: 'user', title: '用户管理', url: '#', component: 'RbacUser' },
                        { id: 'role', title: '角色管理', url: '#', component: 'RbacRole' },
                        { id: 'permission', title: '权限管理', url: '#', component: 'RbacPermission' },
                        { id: 'apply', title: '权限申请', url: '#', component: 'RbacApply' },
                        { id: 'log', title: '操作日志', url: '#', component: 'RbacLog' },
                    ],
                },
                {
                    id: 'settings',
                    title: '系统设置',
                    url: '#',
                    icon: Settings2,
                    isOpen: false,
                    items: [
                        { id: 'dimension', title: '配置管理', url: '#', component: 'DimensionManagement' },
                        { id: 'notification', title: '通知设置', url: '#', component: 'NotificationSettings' },
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
                { id: 'data-dictionary', name: '数据字典', url: '#', icon: Frame, component: 'DataDictionary', },
                { id: 'user-manual', name: '用户操作手册', url: '#', icon: PieChart, component: 'UserManual', },
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

// ============================================
// 导航状态管理
// ============================================

// 从配置中获取默认导航
const firstNavGroup = defaultSidebarConfig.navGroups[0]
const firstMainNav = firstNavGroup?.items[0]
const firstSubNav = firstMainNav?.items?.[0]

// 导航状态 (模块级别的单例状态)
const currentMainNav = ref(firstMainNav?.title ?? '')
const currentSubNav = ref(firstSubNav?.title ?? '')
const detailTitle = ref<string | null>(null) // 存储详情页标题（第三级面包屑）

/**
 * 根据子项标题获取组件名
 */
export function getComponentByTitle(subTitle: string): string {
    // 遍历所有导航组查找匹配的子项
    for (const group of defaultSidebarConfig.navGroups) {
        for (const mainItem of group.items) {
            if (mainItem.items) {
                for (const subItem of mainItem.items) {
                    if (subItem.title === subTitle && subItem.component) {
                        return subItem.component
                    }
                }
            }
        }
    }
    // 遍历项目组查找匹配
    for (const projectGroup of defaultSidebarConfig.projectGroups) {
        for (const project of projectGroup.projects) {
            if (project.name === subTitle && project.component) {
                return project.component
            }
        }
    }
    // 未找到则返回原始值
    return subTitle
}

/**
 * 根据子项ID获取组件名
 */
export function getComponentById(subId: string): string | undefined {
    // 遍历所有导航组查找匹配的子项
    for (const group of defaultSidebarConfig.navGroups) {
        for (const mainItem of group.items) {
            if (mainItem.items) {
                for (const subItem of mainItem.items) {
                    if (subItem.id === subId) {
                        return subItem.component
                    }
                }
            }
        }
    }
    // 遍历项目组查找匹配
    for (const projectGroup of defaultSidebarConfig.projectGroups) {
        for (const project of projectGroup.projects) {
            if (project.id === subId) {
                return project.component
            }
        }
    }
    return undefined
}

/**
 * 导航状态管理 Composable
 * 用于管理当前选中的导航项和面包屑
 */
export function useNavigation() {
    // 设置当前导航
    const setNavigation = (mainNav: string, subNav: string) => {
        currentMainNav.value = mainNav
        currentSubNav.value = subNav
    }

    // 设置详情标题（用于第三级面包屑）
    const setDetailTitle = (title: string | null) => {
        detailTitle.value = title
    }

    // 计算面包屑数据
    const breadcrumbs = computed(() => ({
        main: currentMainNav.value,
        sub: currentSubNav.value,
        detail: detailTitle.value,
    }))

    // 计算当前页面组件名称
    const currentPage = computed(() => {
        return getComponentByTitle(currentSubNav.value)
    })

    return {
        currentMainNav,
        currentSubNav,
        detailTitle,
        breadcrumbs,
        currentPage,
        setNavigation,
        setDetailTitle,
    }
}
