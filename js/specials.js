class DaySpecial {
  constructor(form, submitClass, specialsPath, specialDiv) {
    this.form = $(form);
    this.selectEle = this.form.find('select');
    this.submitClass = submitClass;
    this.specialsPath = specialsPath;
    this.specialDiv = $(specialDiv);
  }

  removeSubmit = () => {
    this.form.find(this.submitClass).remove();
  };

  loadSpecials = () => {
    $.getJSON(this.specialsPath, (data)=>{this.specials = data});
  };

  showSpecials = (e) => {
    var specialInfo = this.specials[$(e.currentTarget).val()];
    var divContent = $('<h3 />').text(specialInfo['title'])
      .append($('<img />').attr('src',specialInfo['image'],'alt',"today's special"))
      .append($('<p />').text(specialInfo['text']));
    this.specialDiv.css('color',specialInfo['color']).html(divContent);
  };

  eventHandler = () => {
    this.selectEle.change(this.showSpecials);
  };

  init = () => {
    this.removeSubmit();
    this.loadSpecials();
    this.eventHandler();
  };
}

(new DaySpecial('#specials form', '.buttons','data/specials.json', '#specialDiv')).init();
