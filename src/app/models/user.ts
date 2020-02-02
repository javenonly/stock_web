export class User {
    id?: number;
    name?: string;
    displayName?: string;
    password?: string;
    confirmPassword?: string;
    telephone?: string;
    email?: string;
    postNo?: string;
    address?: string;
    company?: string;
    industry?: string;
    rememberMe?: boolean;
    changePassword?: boolean;
    constructor(id?: number, name?: string, email?: string, password?: string, rememberMe?: boolean, 
        telephone?: string, postNo?: string ,address?: string,company?: string,industry?: string,
        changePassword?: boolean, confirmPassword?: string, displayName?: string) {
        this.id = id;
        this.name = name;
        this.displayName = displayName;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.telephone = telephone;
        this.email = email;
        this.postNo = postNo;
        this.address = address;
        this.company = company;
        this.industry = industry;
        this.rememberMe = rememberMe;
        this.changePassword = changePassword;
    }
}