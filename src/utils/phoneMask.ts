function phoneMask(phoneNumber: string) {
    return phoneNumber.length === 11 ? 
    phoneNumber.replace(/[^\d]/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3") :
    phoneNumber;
}

export default phoneMask