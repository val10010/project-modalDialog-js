(function() {
  const buttonTop = document.querySelector('.ButtonTop');
  const elem = document.querySelectorAll('[data-elem]');
  buttonTop.addEventListener('click', runPopup);
  function runPopup(event) {
    const modal = document.querySelector('.modal');
    modal.classList.remove('hide');

  }
  console.log(elem);
  for(let i=0; i<elem.length; i++){
    elem[i].addEventListener('click', closeBlock);
    function closeBlock (event){
 if(event.target.dataset.elem == 1) {
 document.querySelector('.modal').classList.add('hide');
 }
 if(event.target.dataset.elem == 3){
  document.querySelector('.modal').classList.add('hide');
  alert('hello');


      } 
    }
  }




})();
