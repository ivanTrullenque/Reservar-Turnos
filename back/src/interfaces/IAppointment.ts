interface IAppointment {
    id:number;
    date:Date;
    time:string;
    userId:number
    description:string;
    status:"active"| "Cancelled"
}
export default IAppointment