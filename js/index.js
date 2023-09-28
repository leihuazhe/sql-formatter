const attachFormat = () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const output2 = document.getElementById('output2');
    const error = document.getElementById('error');

    const language = document.getElementById('language');
    const tabWidth = document.getElementById('tabWidth');
    const useTabs = document.getElementById('useTabs');
    const keywordCase = document.getElementById('keywordCase');
    const indentStyle = document.getElementById('indentStyle');
    const logicalOperatorNewline = document.getElementById('logicalOperatorNewline');
    const tabulateAlias = document.getElementById('tabulateAlias');
    const commaPosition = document.getElementById('commaPosition');
    const expressionWidth = document.getElementById('expressionWidth');
    const lineBetweenQueries = document.getElementById('lineBetweenQueries');
    const denseOperators = document.getElementById('denseOperators');
    const newlineBeforeSemicolon = document.getElementById('newlineBeforeSemicolon');

    function showOutput(text) {
        output.value = text;
        output.style.display = 'block';
        error.style.display = 'none';
    }

    function showOutput2(text) {
        const htmlText = escapeTextToHtml(text);
        //console.log(htmlText)
        output2.innerHTML = htmlText;
        output2.style.display = 'block';
        output.style.display = 'none';
        error.style.display = 'none';
    }

    function escapeTextToHtml(text) {
        return text
            .replaceAll('\n', '<br/>')
            .replaceAll('\t', "&nbsp;");
    }

    var stringToHTML = function (str) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');
        return doc.body;
    };


    function showError(text) {
        error.innerHTML = text;
        output.style.display = 'none';
        error.style.display = 'block';
    }

    function format() {
        try {
            // const config = {
            //     language: language.options[language.selectedIndex].value,
            //     tabWidth: tabWidth.value,
            //     useTabs: useTabs.checked,
            //     keywordCase: keywordCase.options[keywordCase.selectedIndex].value,
            //     indentStyle: indentStyle.options[indentStyle.selectedIndex].value,
            //     logicalOperatorNewline:
            //     logicalOperatorNewline.options[logicalOperatorNewline.selectedIndex].value,
            //     tabulateAlias: tabulateAlias.checked,
            //     commaPosition: commaPosition.options[commaPosition.selectedIndex].value,
            //     expressionWidth: expressionWidth.value,
            //     lineBetweenQueries: lineBetweenQueries.value,
            //     denseOperators: denseOperators.checked,
            //     newlineBeforeSemicolon: newlineBeforeSemicolon.checked,
            // };

            const config = {
                language: 'sql',
                tabWidth: 2,
                useTabs: false,
                keywordCase: 'upper',
                indentStyle: 'standard',
                logicalOperatorNewline: 'before',
                tabulateAlias: true,
                commaPosition: 'after',
                expressionWidth: "50",
                lineBetweenQueries: "1",
                denseOperators: false,
                newlineBeforeSemicolon: false,
            };
            console.log(config)

            var formatValue = sqlFormatter.format(input.value, config);
            formatValue = formatValue.replaceAll(' ', '\t')
            const hl = hljs.highlight(formatValue, {language: 'sql'}).value;
            showOutput2(hl);
        } catch (e) {
            if (e instanceof sqlFormatter.ConfigError) {
                showError(`<h2>Configuration error</h2><p>${e.message}</p>`);
            } else {
//                 showError(
//                     `
// <h2>An Unexpected Error Occurred</h2>
// <p><strong>${e.message}</strong></p>
// <p>
//   Please report this at
//   <a href="https://github.com/sql-formatter-org/sql-formatter/issues">Github issues page.<a>
// </p>
// <p>Stack Trace:</p>
// <pre>${e.stack.toString()}</pre>
// `
//                 );
                showOutput2("SQL语法错误:\n\n" + input.value);

            }
        }
    }

    input.addEventListener('input', format);
    [
        language,
        tabWidth,
        useTabs,
        keywordCase,
        indentStyle,
        logicalOperatorNewline,
        tabulateAlias,
        commaPosition,
        expressionWidth,
        lineBetweenQueries,
        denseOperators,
        newlineBeforeSemicolon,
    ].forEach(option => option.addEventListener('change', format));

    format();
};

document.addEventListener('DOMContentLoaded', attachFormat);
