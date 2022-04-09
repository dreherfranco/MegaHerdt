import { Departamento } from "./Departamento";
import { Municipio } from './Municipio';
import { Provincia } from "./Provincia";
import { LocalidadCensal } from "./LocalidadCensal";
import { Centroide } from "./Centroide";

export class Locality {
    categoria: string;
    fuente: string;
    municipio: Municipio;
    departamento: Departamento;
    nombre: string;
    id: string;
    provincia: Provincia;
    localidad_censal: LocalidadCensal;
    centroide: Centroide;
    constructor(){
        this.categoria = '';
        this.fuente = '';
        this.municipio = new Municipio();
        this.departamento = new Departamento();
        this.nombre = '';
        this.id = '';
        this.provincia = new Provincia();
        this.localidad_censal = new LocalidadCensal();
        this.centroide = new Centroide();
    }

}