 console.log('bbbbbbb');
 
document.addEventListener("DOMContentLoaded", function() {
    // Find the target <th> elements by their ids
    const targetThColor = document.getElementById("view-field-color-table-column");
    const targetThSex = document.getElementById("view-field-sex-table-column");
    const targetThNativity = document.getElementById("view-field-nativity-table-column");
    const targetThDisease = document.getElementById("view-field-disease-table-column");
    const targetThWhereBuried = document.getElementById("view-field-whereburied-table-column");

    // Create the link elements
    const linkColor = document.createElement("a");
    linkColor.textContent = " (Info)";
    linkColor.href = "/ahc/cemeteries-notes#race-ethnicity";

    const linkSex = document.createElement("a");
    linkSex.textContent = " (Info)";
    linkSex.href = "/ahc/cemeteries-notes#sex";

    const linkNativity = document.createElement("a");
    linkNativity.textContent = " (Info)";
    linkNativity.href = "/ahc/cemeteries-notes#place-of-birth";

    const linkDisease = document.createElement("a");
    linkDisease.textContent = " (Info)";
    linkDisease.href = "/ahc/cemeteries-notes#cause-of-death";

    const linkWhereBuried = document.createElement("a");
    linkWhereBuried.textContent = " (Info)";
    linkWhereBuried.href = "/ahc/cemeteries-notes#where-buried";

    // Insert the link elements after the original content of the <th> elements
    targetThColor.appendChild(linkColor);
    targetThSex.appendChild(linkSex);
    targetThNativity.appendChild(linkNativity);
    targetThDisease.appendChild(linkDisease);
    targetThWhereBuried.appendChild(linkWhereBuried);
});


        
 let text1 = document.getElementsByClassName('field_yearsmonthsdays');
 for (let i = 0; i < text1.length; i++) {
   text = text1[i].innerText;
   text = text.replace('000-00-00', 'Blank');
   text = text.replace('N', 'Blank');
   text = text.replace(/(000)-(00)-(\d\d)/, '$3 days');
   text = text.replace(/(000)-(\d\d)-(\d\d)/, '$2 months');
   //text = text.replace(/(\d\d\d)-(\d\d)-(\d\d)/, '$1 years, $2 months, $3 days');
   text = text.replace(/(\d\d\d)-(\d\d)-(\d+)/, '$1 years');
   text = text.replace(/0(\d\d)/, '$1');
   text = text.replace(/0(\d)/g, '$1');
   text = text.replace('/(.*), 1 months, (.*)', '$1, 1 month, $2');
   text = text.replace('1 days', '1 day');
   text = text.replace('1 months', '1 month');
   text = text.replace('/$1 years/', '1 year');
   text1[i].innerText = text;
 }
 let text2 = document.getElementsByClassName('field_ethnicity');
 for (let i = 0; i < text2.length; i++) {
   text = text2[i].innerText;
   text = text.replace('C', 'African American');
   text = text.replace('N', 'African American');
   text = text.replace('M', 'Mexican');
   text = text.replace('I', 'Native American');
   text = text.replace('W', 'White');
   text2[i].innerText = text;
 }
 let text3 = document.querySelectorAll('.field_whereburied, .field_remarks, .field_seclotspace');
for (let i = 0; i < text3.length; i++) {
  let text = text3[i].innerText;
  text = text.replace('Mt Calvary', 'Mount Calvary');
  text = text.replace('Mt Cal', 'Mount Calvary');
  text = text.replace(/^State$/, 'State Cemetery');
  text = text.replace(/^Annex$/, 'Oakwood Annex');
  text = text.replace(/Cem$/i, 'Cemetery');
  text = text.replace(/cem\s+/ig, 'Cemetery ');
  text = text.replace(/Col\.? Gr\.?/ig, 'Colored Grounds ');
  text = text.replace(/Col\. Grounds\.?/ig, 'Colored Grounds ');
  text = text.replace(/Stanger grounds?/ig, 'Strangers Grounds ');
  text = text.replace(/Stranger grounds?/ig, 'Strangers Grounds ');
  text = text.replace('Old Strangers Grounds', 'Strangers Grounds');
  text = text.replace(/Me?x\.?\s?Grd?\.?/ig, ' Mexican Grounds');
  text = text.replace('Mexican Groundss', 'Mexican Grounds');
  text = text.replace('Colored Grounds ds.', 'Colored Grounds');
  text = text.replace(/Strng\./, 'Strangers');
  text = text.replace('Grds.', 'Grounds');
  text = text.replace('Old Grds', ' Old Grounds');
  text = text.replace(/^Pauper(?: Gr\.)?$|Pauper Ground$/, 'Pauper Grounds');
  text = text.replace(/^Pauper$/, 'Pauper Grounds');

  text3[i].innerText = text;
}

 const str = document.querySelectorAll(
   '.oakwood-row strong, .burial_date, .field_sex, .field_ethnicity, .field_birth, .field_cause_of_death, .field_attendingphysician, .field_whereburied, .field_bywhomburied,  .field_remarks, .field_seclotspace'
 );
 for (let i = 0; i < str.length; i++) {
   text = str[i].innerText;
   const str2 = text.charAt(0).toUpperCase() + text.slice(1);
   str[i].innerText = str2;
 }