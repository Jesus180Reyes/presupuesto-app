export interface GastosResponse {
    ok:     boolean;
    gastos: Gasto[];
}

export interface Gasto {
    id:        number;
    nombre:    string;
    total:     number;
    fecha:     Date;
    createdAt: Date;
    updatedAt: Date;
}
