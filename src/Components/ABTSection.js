export default function ABTSection() {
  function IndexArea() {
    return (
      <>
        <h4>Major Translations</h4>
        <div id="ABT-index">
          <a
            className="card-link index"
            href="https://www.ancient-buddhist-texts.net/"
            target="_blank"
            rel="noreferrer"
          >
            Home
          </a>
          <a
            className="card-link index"
            href="https://www.ancient-buddhist-texts.net/English-Texts/ET-index.htm"
            target="_blank"
            rel="noreferrer"
          >
            English Only
          </a>
          <a
            className="card-link index"
            href="https://www.ancient-buddhist-texts.net/Texts-and-Translations/TT-index.htm"
            target="_blank"
            rel="noreferrer"
          >
            Pali & English
          </a>
        </div>
      </>
    );
  }

  function LinksSection() {
    return (
      <>
        <div className="nikaya-group">
          <a
            className="all-link Khp"
            title="Khuddakapāṭha"
            rel="noreferrer"
            href="https://www.ancient-buddhist-texts.net/Texts-and-Translations/Khuddakapatha/Khuddakapatha.htm"
            target="_blank"
          >
            Khp
            <br /> Pali-English
          </a>
          <a
            className="all-link Khp"
            title="Khuddakapāṭha"
            rel="noreferrer"
            href="https://www.ancient-buddhist-texts.net/English-Texts/Short-Readings/index.htm"
            target="_blank"
          >
            Khp
            <br /> English
          </a>
          <a
            className="all-link Dhp"
            title="Dhammapada"
            rel="noreferrer"
            href="https://www.ancient-buddhist-texts.net/Texts-and-Translations/Dhammapada/index.htm"
            target="_blank"
          >
            Dhp
            <br /> Pali-English
          </a>
          <a
            className="all-link Dhp"
            title="Dhammapada"
            rel="noreferrer"
            href="https://www.ancient-buddhist-texts.net/English-Texts/Dhamma-Verses/index.htm"
            target="_blank"
          >
            Dhp
            <br />
            English
          </a>
        </div>
        <div className="nikaya-group">
          <a
            className="all-link Ud"
            title="Udāna"
            rel="noreferrer"
            href="https://www.ancient-buddhist-texts.net/Texts-and-Translations/Udana/index.htm"
            target="_blank"
          >
            Ud
            <br />
            Pali-English
          </a>
          <a
            className="all-link Ud"
            title="Udāna"
            rel="noreferrer"
            href="https://www.ancient-buddhist-texts.net/English-Texts/Exalted-Utterances/index.htm"
            target="_blank"
          >
            Ud
            <br />
            English
          </a>

          <a
            className="all-link Snp"
            title="Sutta Nipāta"
            rel="noreferrer"
            href="https://www.ancient-buddhist-texts.net/Texts-and-Translations/Parayanavagga/index.htm"
            target="_blank"
          >
            Snp 5<br />
            Pali-English
          </a>
          <a
            className="all-link Snp"
            title="Sutta Nipāta"
            rel="noreferrer"
            href="https://www.ancient-buddhist-texts.net/English-Texts/Way-to-the-Beyond/index.htm"
            target="_blank"
          >
            Snp 5<br />
            English
          </a>
          <a
            className="all-link Ja"
            title="Jātaka"
            rel="noreferrer"
            href="https://www.ancient-buddhist-texts.net/English-Texts/Jataka/index.htm#gsc.tab=0"
            target="_blank"
          >
            Ja English
            <br />
            E.B. Cowel
          </a>
        </div>
      </>
    );
  }

  return (
    <div id="ABT-section">
      <IndexArea />
      <LinksSection />
    </div>
  );
}

function LinkList() {
  return (
    <ul>
      <li>
        <a href="https://www.ancient-buddhist-texts.net">AncientBuddhistTexts Homepage</a>
      </li>
      <li>
        <a href="https://www.ancient-buddhist-texts.net/English-Texts/ET-index.htm">English Only Section</a>
      </li>
      <li>
        <a href="https://www.ancient-buddhist-texts.net/Texts-and-Translations/TT-index.htm">Pali & English Section</a>
      </li>
      <li>
        <a href="https://www.ancient-buddhist-texts.net/Texts-and-Translations/Khuddakapatha/Khuddakapatha.htm">
          Khuddakapāṭha Pali-English
        </a>
      </li>
      <li>
        <a href="https://www.ancient-buddhist-texts.net/English-Texts/Short-Readings/index.htm">
          Khuddakapāṭha English
        </a>
      </li>
      <li>
        <a href="https://www.ancient-buddhist-texts.net/Texts-and-Translations/Dhammapada/index.htm">
          Dhammapada Pali-English
        </a>
      </li>
      <li>
        <a href="https://www.ancient-buddhist-texts.net/English-Texts/Dhamma-Verses/index.htm">Dhammapada English</a>
      </li>
      <li>
        <a href="https://www.ancient-buddhist-texts.net/Texts-and-Translations/Udana/index.htm">Udāna Pali-English</a>
      </li>
      <li>
        <a href="https://www.ancient-buddhist-texts.net/English-Texts/Exalted-Utterances/index.htm">Udāna English</a>
      </li>

      <li>
        <a href="https://www.ancient-buddhist-texts.net/Texts-and-Translations/Parayanavagga/index.htm">
          Sutta Nipāta ch 5 Pali-English
        </a>
      </li>
      <li>
        <a href="https://www.ancient-buddhist-texts.net/English-Texts/Way-to-the-Beyond/index.htm">
          Sutta Nipāta ch 5 English
        </a>
      </li>
      <li>
        <a href="https://www.ancient-buddhist-texts.net/English-Texts/Jataka/index.htm#gsc.tab=0">
          Jātaka Translation, E.B. Cowel
        </a>
      </li>
    </ul>
  );
}
