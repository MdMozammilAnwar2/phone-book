export class PhoneBook {
  constructor(
    public contactId: number,
    public contactName: string,
    public contactEmail: string,
    public contactNumber: string,
    public isActive: boolean,
    public createdDate: String,
    public updatedDate: String
  ) {}
}

export class InsertPhoneBook {
  constructor(
    public contactName: string,
    public contactEmail: string,
    public contactNumber: string
  ) {}
}
 