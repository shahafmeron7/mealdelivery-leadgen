import { spacesData } from "./spacesData";
export function setSpacesDynamic(listId) {
  spacesData[0]['list'] = listId;
  var div_id = spacesData[0]["elmid"];
  document.getElementById(div_id).innerHTML = '';
  const scriptElement = document.createElement('script');
  scriptElement.src = 'https://assets.trafficpointltd.com/spaces/js/ats.js';
  scriptElement.setAttribute('data-init', JSON.stringify(spacesData));
  document.head.appendChild(scriptElement);
  scriptElement.onload = function () {
      const loadEvent = new Event('load_ats');
      console.log('dispatch ats')
      window.dispatchEvent(loadEvent);
  };
}