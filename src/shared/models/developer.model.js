export class DeveloperEntity{
    id;
    firstName;
    lastName;
    name;
    description;
    country;
    phone;
    completed_projects;
    specialties;
    profile_img_url;
    user;
    constructor(id,firstName, lastName, description, country, phone, completed_projects, specialties, profile_img_url, user = Object){
        this.id=id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.name = firstName + ' ' + lastName;
        this.description = description;
        this.country = country;
        this.phone = phone;
        this.completed_projects = completed_projects;
        this.specialties = specialties;
        this.profile_img_url = profile_img_url;
        this.user = user;
    }
}
