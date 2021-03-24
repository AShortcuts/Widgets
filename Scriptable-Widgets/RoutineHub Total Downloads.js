// RoutineHub User Stats Widget
// Script written by AShortcuts
// Version 1.0
// icon-color: red; icon-glyph: address-card;

// Input your RoutineHub User in the widget parameter
var user = args.widgetParameter;
if (user == null) { 
  var user = "AShortcuts";
}

// Extract the Date
let url = `https://routinehub.co/user/${user}`;
let r = new Request(url)
let html = await r.loadString()
let result = html.match(/Downloads:\s(\d+)/i)
let downloadCount = result[1];
var pfpresult = html.match(/<img class="is-rounded" src="(.+?)"/i);

// Check if there is a Profile Picture associated with the user
if (pfpresult == null) {
  var pfpimage = 'https://pbs.twimg.com/profile_images/1052254690103177216/wzFlmIDb_400x400.jpg'
} else {
  var pfpimage = pfpresult[1];
}

// If run with Siri
if (config.runsWithSiri) {
    Speech.speak(`${user} has ${downloadCount} downloads currently.`)
}

// Setting up widget
let widget = new ListWidget();
widget.setPadding(0, 5, 0, 5);
widget.backgroundColor = new Color("#191919");

// Add Profile Picture
widget.addSpacer(10)
let req = new Request(pfpimage);
let image = await req.loadImage();
let widgetImage = widget.addImage(image);
widgetImage.imageSize = new Size(45, 45);
widgetImage.cornerRadius = 15;
widgetImage.url = `https://routinehub.co/user/${user}`;
widgetImage.centerAlignImage();

// Add 'Total Downloads' text
widget.addSpacer(5)
let headerText = widget.addText("Total Downloads:");
headerText.textColor = Color.white();
headerText.textOpacity = .6;
headerText.font = Font.regularSystemFont(13)
headerText.lineLimit = 1;
headerText.minimumScaleFactor = 0.5;
headerText.centerAlignText();

// Insert Download Count
let downloadCountText = widget.addText(downloadCount);
downloadCountText.textColor = Color.white();
downloadCountText.font = Font.regularSystemFont(33)
downloadCountText.lineLimit = 1;
downloadCountText.centerAlignText();

widget.addSpacer(2)

// Last Updated Text
let date = new Date();
let lastRanDateAndTime = date.toLocaleString()
let lastRanText = widget.addText(lastRanDateAndTime + "");
lastRanText.textColor = Color.white();
lastRanText.textOpacity = .65;
lastRanText.font = Font.regularSystemFont(8)
lastRanText.lineLimit = 1;
lastRanText.centerAlignText();

widget.addSpacer()

// End script
Script.setWidget(widget);
widget.presentSmall()
Script.complete();
