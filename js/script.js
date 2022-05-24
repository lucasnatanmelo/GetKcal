const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const gender = getSelectedValue('gender');
  const age = getInputNumberValue('age');
  const weight = getInputNumberValue('weight');
  const height = getInputNumberValue('height');
  const activityLevel = getSelectedValue('activity_level');
  const imc = calculateImc(gender, weight, height);

  const tmb = Math.round(
    gender === 'female'
      ? (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age))
      : (66 + (13.7 * weight) + (5 * height) - (6.8 * age))
);

  const maintenance = Math.round(tmb * Number(activityLevel));
  const loseWeight = maintenance - 450;
  const gainWeight = maintenance + 450;

  const layout = `
    <h3>Resultado:</h3>

    <div class="result-content">
      <ul>
        <li>
          Seu índice de Massa Corporal indica: </br>
          <strong>${imc}</strong>
        </li>
        <li>
          Seu metabolismo basal é de: </br>
          <strong>${tmb} calorias</strong>
        </li>
        <li>
          Para manter o seu peso você precisa consumir em média: </br>
          <strong>${maintenance} calorias</strong>
        </li>
        <li>
          Para perder peso você precisa consumir em média: </br>
          <strong>${loseWeight} calorias</strong>
        </li>
        <li>
          Para ganhar peso você precisa consumir em média: </br>
          <strong>${gainWeight} calorias</strong>
        </li>
      </ul>
    </div>
  `;

  const result = document.getElementById('result');

  result.innerHTML = layout;
}

function getSelectedValue(id) {
  const select = document.getElementById(id);
  return select.options[select.selectedIndex].value;
}

function getInputNumberValue(id) {
  return Number(document.getElementById(id).value);
}


function calculateImc(gender, weight, height){
  let heightToMeter = height/100;
  let imcPararamether = ((weight)/(heightToMeter*heightToMeter));
  if((gender === 'male')){
    if (imcPararamether >= 40){
      return 'Obesidade Grau III - Mórbida';
    }
    if((imcPararamether >= 30) && (imcPararamether < 40)){
      return 'Obesidade Grau II - Moderada';
    }
    if((imcPararamether >= 25) && (imcPararamether < 30)){
      return 'Obesidade Grau I - Leve';
    }
    if((imcPararamether >= 20) && (imcPararamether < 25)){
      return 'Peso Normal';
    }
    if((imcPararamether < 20)){
      return 'Peso abaixo do normal';
    }
  } else{
    if((gender === 'female')){
    if (imcPararamether >= 40){
      return 'Obesidade Grau III - Mórbida';
    }
    if((imcPararamether >= 30) && (imcPararamether < 40)){
      return 'Obesidade Grau II - Moderada';
    }
    if((imcPararamether >= 24) && (imcPararamether < 30)){
      return 'Obesidade Grau I - Leve';
    }
    if((imcPararamether >= 19) && (imcPararamether < 24)){
      return 'Peso Normal';
    }
    if((imcPararamether < 19)){
      return 'Peso abaixo do normal';
    }
  }
}
}
