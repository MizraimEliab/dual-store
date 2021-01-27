export class Signin{
    constructor(first_name = '', middle_name = '', last_name = '', phone_number = '', email = '', password = '', password_confirmation = ''){
        this.first_name = first_name,
        this.middle_name = middle_name,
        this.last_name = last_name,
        this.phone_number = phone_number,
        this.email = email,
        this.password = password,
        this.password_confirmation = password_confirmation
    }

    first_name:string;
    middle_name:string;
    last_name:string;
    phone_number:string;
    // address:Address;
    email:string;
    password:string;
    password_confirmation:string;

    
   

}
// export interface Address{
//     city:string;
//     state:string; 
// }