import { Component, OnInit } from '@angular/core';
import { AngularFireObject } from '@angular/fire/database';

import { ScoreService } from './services/score.service';
import { answers } from '../../shared/answers.class';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

  mathCT = '';
  mathPC = '';
  mathPI = '';
  mathPSR = '';
  criticalReadingCT = '';
  criticalReadingPC = '';
  criticalReadingPI = '';
  criticalReadingPSR = '';
  socialCT = '';
  socialPC = '';
  socialPI = '';
  socialPSR = '';
  scienceCT = '';
  sciencePC = '';
  sciencePI = '';
  sciencePSR = '';
  englishCT = '';
  englishPC = '';
  englishPI = '';
  englishPSR = '';
  
  itemRef: AngularFireObject<any>;
  
  constructor(public score: ScoreService) { }

  ngOnInit() {
    this.itemRef = this.score.getScore();

    this.itemRef.snapshotChanges().subscribe(actions => {
      
      let request = new answers();
      request.idBank = actions.payload.child('-MN2L1ZvzmA8_166S6uw').child('idBank').val();
      request.idUser = actions.payload.child('-MN2L1ZvzmA8_166S6uw').child('idUser').val();
      request.puntajes = actions.payload.child('-MN2L1ZvzmA8_166S6uw').child('puntajes').val();
      console.log(request);

      this.mathCT = request.puntajes[0].puntajes.cantidadPreguntas;
      this.mathPC = request.puntajes[0].puntajes.cantidadAciertos;
      this.mathPI = request.puntajes[0].puntajes.cantidadErradas;
      this.mathPSR = request.puntajes[0].puntajes.cantidadSinRespuesta;

      this.criticalReadingCT = request.puntajes[1].puntajes.cantidadPreguntas;
      this.criticalReadingPC = request.puntajes[1].puntajes.cantidadAciertos;
      this.criticalReadingPI = request.puntajes[1].puntajes.cantidadErradas;
      this.criticalReadingPSR = request.puntajes[1].puntajes.cantidadSinRespuesta;

      this.socialCT = request.puntajes[2].puntajes.cantidadPreguntas;
      this.socialPC = request.puntajes[2].puntajes.cantidadAciertos;
      this.socialPI = request.puntajes[2].puntajes.cantidadErradas;
      this.socialPSR = request.puntajes[2].puntajes.cantidadSinRespuesta;

      this.scienceCT = request.puntajes[3].puntajes.cantidadPreguntas;
      this.sciencePC = request.puntajes[3].puntajes.cantidadAciertos;
      this.sciencePI = request.puntajes[3].puntajes.cantidadErradas;
      this.sciencePSR = request.puntajes[3].puntajes.cantidadSinRespuesta;
    });

  }

}
