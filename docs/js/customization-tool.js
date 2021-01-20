$(document).ready(function(){
    //Download profiles
    $("#btnDownload").click(function(){

        // Label texts
        var aLabels = $('label').map(function() {
            return this;
        }).get();

        // Input values from textfields
        var aInputValues = $('.form-control').map(function() {
            return this.value;
        }).get();

        // List items of output list
        var oListItems = $(".profile-expression");

        // Assign textfield value to output list item including label structure
        $.each( oListItems, function( key, value ) {
            value.innerHTML = aLabels[key].textContent+ ' ' + aInputValues[key];
        });

        $("#confirmDialog").modal()
    });

    $("#btnConfirmDownload").click(function(){
        //Insert expressions into code
        var aInputValues = $('.form-control').map(function() {
            return this.value;
        }).get();
        $.each( aInputValues, function( key, value ) {
            sArduinoCode = sArduinoCode.replace('CUSTOM_EXPRESSION_' + key, value)
        });

        download('ArduinoCode.ino', sArduinoCode)
        $("#confirmDialog").modal('hide')
    });

    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
    
        element.style.display = 'none';
        document.body.appendChild(element);
    
        element.click();
    
        document.body.removeChild(element);
    }

    var sArduinoCode = 
        "// Using the EMIC2 library to ouput text as speech\n" +
        "// Special control symbols for dynamic changes of\n" +
        "// pitch (/\ - increase, \/ - decrease),\n" +
        "// rate (>> - increase, << - decrease),\n" +
        "// emphasis (__ - emphasize next word),\n" +
        "// whispering (## - whisper next word),\n" +
        "// voice (:-)x, x:[0,8])\n"+
        "\n"+
        "#include <SoftwareSerial.h>  // Needed by the EMIC2 library\n"+
        "#include <SD.h>  // Needed by the EMIC2 library, though not utilized in this example\n"+
        "#include \"EMIC2.h\"\n"+
        "\n"+
        "#define RX_PIN 2  // Connect SOUT pin of the Emic 2 module to the RX pin\n"+
        "#define TX_PIN 3  // Connect SIN pin of the Emic 2 module to the TX pin\n"+
        "\n"+
        "EMIC2 emic;  // Creates an instance of the EMIC2 library\n"+
        "\n"+
        "void setup()\n"+
        "{\n"+
        "Serial.begin(9600);\n"+
        "// Initializes the EMIC2 instance\n"+
        "// The library sets up a SoftwareSerial port\n"+
        "// for the communication with the Emic 2 module\n"+
        "emic.begin(RX_PIN, TX_PIN);\n"+
        "\n"+
        "emic.setVoice(1);  // Sets the voice (9 choices: 0 - 8)\n"+
        "emic.setVolume(18);  // Sets the Lautstärke level to 18dB (range: [-48,18])\n"+
        "}\n"+
        "\n"+
        "void loop()\n"+
        "{\n"+
        "float top = random(0,99)/100.0;\n"+
        "float bottom = random(0,99)/100.;\n"+
        "float left = random(0,99)/100.0;\n"+
        "float right = random(0,99)/100.0;\n"+
        "\n"+
        "Serial.println(\"Top\");\n"+
        "Serial.println(top);\n"+
        "Serial.println(\"Bottom\");\n"+
        "Serial.println(bottom);\n"+
        "Serial.println(\"Left\");\n"+
        "Serial.println(left);\n"+
        "Serial.println(\"Right\");\n"+
        "Serial.println(right);\n"+
        "\n"+
        "if(top > 0.9){\n"+
        "    emic.speak(\"CUSTOM_EXPRESSION_0\");\n"+
        "}\n"+
        "\n"+
        "if(bottom > 0.9){\n"+
        "    emic.speak(\"CUSTOM_EXPRESSION_1\");\n"+
        "}\n"+
        "\n"+
        "if(left > 0.9){\n"+
        "    emic.speak(\"CUSTOM_EXPRESSION_2\");\n"+
        "}\n"+
        "\n"+
        "if(right > 0.9){\n"+
        "    emic.speak(\"CUSTOM_EXPRESSION_3\");\n"+
        "}\n"+
        "emic.speak(\"CUSTOM_EXPRESSION_4\")\n"+
        "emic.speak(\"CUSTOM_EXPRESSION_5\")\n"+
        "emic.speak(\"CUSTOM_EXPRESSION_6\")\n"+
        "emic.speak(\"CUSTOM_EXPRESSION_7\")\n"+
        "emic.speak(\"CUSTOM_EXPRESSION_8\")\n"+
        "emic.speak(\"CUSTOM_EXPRESSION_9\")\n"+
        "emic.speak(\"CUSTOM_EXPRESSION_10\")\n"+
        "emic.speak(\"CUSTOM_EXPRESSION_11\")\n"+
        "\n"+
        "delay(2000);\n"+
        "}";
    
});