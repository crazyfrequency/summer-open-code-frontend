class AdminPages {
	private root = "";

	HOME = this.root ?? "/"
	IMPORT_DATA = this.HOME
	BIC_DIRECTORY_ENTRY = `${this.root}/bicDirectoryEntry`
	RSTR_LIST = `${this.root}/rstrList`
	ACCOUNTS = `${this.root}/accounts`
	SWBICS = `${this.root}/swbics`

	CREATE_IMPORT_DATA = `${this.root}/importData/new`
	CREATE_BIC_DIRECTORY_ENTRY = `${this.root}/bicDirectoryEntry/new`
	CREATE_RSTR_LIST = `${this.root}/rstrList/new`
	CREATE_ACCOUNTS = `${this.root}/accounts/new`
	CREATE_SWBICS = `${this.root}/swbics/new`
}

export const ADMIN_PAGES = new AdminPages()

class AuthPages {
	private root = "";

	LOGIN = `${this.root}/login`
	LOGOUT = `${this.root}/logout`
}

export const AUTH_PAGES = new AuthPages()