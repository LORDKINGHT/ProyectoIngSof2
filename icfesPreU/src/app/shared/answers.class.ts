import { subject } from './subject.class';
import { subjectScore } from './subjectScore.class';

export class answers {
    idUser: string;
    idBank: string;
    respuestas: Array<subject>;
    puntajes: Array<subjectScore>;
}