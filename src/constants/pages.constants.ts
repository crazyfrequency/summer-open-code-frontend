class AdminPages {
	private root = "";

	HOME = this.root ?? "/"
	COURSES = `${this.root}/courses`
	MAILING = `${this.root}/mailing`
	MESSAGES = `${this.root}/messages`
	TEACHERS = `${this.root}/teachers`
	CHILDREN = `${this.root}/children`
}

export const ADMIN_PAGES = new AdminPages()

class AuthPages {
	private root = "";

	LOGIN = `${this.root}/login`
	LOGOUT = `${this.root}/logout`
}

export const AUTH_PAGES = new AuthPages()