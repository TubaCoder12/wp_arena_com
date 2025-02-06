import { useEffect, useState } from "react";

export default function BlogPage() {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // 🔹 Extracting h2, h3, h4 from the blog content
    const headingElements = document.querySelectorAll("h2, h3, h4");

    const extractedHeadings = Array.from(headingElements).map((el) => ({
      id: el.textContent.toLowerCase().replace(/\s+/g, "-"), // Generate unique ID
      text: el.textContent,
      level: el.tagName, // h2, h3, h4
    }));

    setHeadings(extractedHeadings);

    // Assign IDs to headings
    headingElements.forEach((heading) => {
      heading.id = heading.textContent.toLowerCase().replace(/\s+/g, "-");
    });
  }, []);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex space-x-8 p-8">
      {/* Table of Contents (TOC) */}
      <div className="p-4 border rounded-md shadow-md bg-white w-64 sticky top-4 h-fit">
        <h2 className="font-bold text-lg mb-2">Table of Contents</h2>
        <ul className="list-none pl-0">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`ml-${heading.level === "H3" ? "4" : heading.level === "H4" ? "8" : "0"}`}
            >
              <button
                onClick={() => handleScroll(heading.id)}
                className="text-blue-500 hover:underline"
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Blog Content */}
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">My Blog Post</h1>

        <div className="prose">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, sunt quis. Reiciendis omnis, facilis repudiandae doloribus tempore in at laboriosam deserunt, possimus neque rerum delectus veniam molestias, corrupti consequatur dolore?
          Ipsa consequuntur, laudantium architecto, accusantium, quisquam non tenetur doloribus sapiente facilis accusamus ipsam officia. Ex deleniti adipisci sequi, harum necessitatibus dolorum mollitia quae laborum repellat quos. In, amet minima. Sapiente.
          Ipsa, delectus fugiat unde odit recusandae velit incidunt! Eveniet sed, magni enim placeat inventore dolorum aut deserunt tempora distinctio esse autem veritatis itaque mollitia, ut voluptatibus ipsa! Accusamus, magni culpa?
          Autem nam praesentium ipsum nisi magni molestiae sit consequatur ullam itaque in incidunt, assumenda illum ducimus consectetur sequi impedit temporibus officia dolorum aliquam fuga reprehenderit magnam provident. Culpa, reiciendis nesciunt?
          Nostrum neque deleniti est pariatur labore officiis reprehenderit architecto aliquam iusto delectus? Sit quisquam dolore nobis reiciendis fuga ullam? Aperiam perspiciatis, facilis distinctio expedita voluptas error blanditiis recusandae unde consectetur.
          Doloremque id in, aspernatur laboriosam, culpa ipsam explicabo maiores dicta, sed possimus temporibus. Enim inventore ex accusantium fugit tenetur, eius quas culpa adipisci error nobis ratione quisquam amet nemo explicabo!
          Vel eaque commodi doloribus obcaecati, accusamus aut nobis laboriosam nostrum unde voluptates repudiandae, ea perspiciatis, cupiditate quos consectetur error amet enim reprehenderit aperiam eos ex! Tempore saepe similique repellendus nulla!
          Quis facere vitae saepe quos assumenda modi, quibusdam eligendi voluptate, fugit iure exercitationem. Quibusdam aliquam cumque facilis. Qui est cumque id consequuntur fugit, perspiciatis, quos nemo necessitatibus esse dolore placeat.
          Vitae corporis similique mollitia architecto, rerum deleniti tempora illum ex reprehenderit inventore suscipit qui officiis autem odio cum pariatur. Rem nam sapiente voluptatem eaque necessitatibus facilis minima dolorem eveniet iusto!
          Non itaque ratione soluta dolorum! Sit, sequi. Omnis assumenda minima quisquam quo, commodi unde animi dolor laboriosam, culpa quod dignissimos autem ex quia incidunt, error ea? Est sapiente cupiditate nobis!
          Tempora nulla dignissimos dolorum nobis possimus nihil perferendis eligendi modi at corrupti nostrum consequuntur soluta quae, quidem assumenda vel asperiores minima commodi in, voluptatem, nisi cum repellendus! Inventore, nobis maxime?
          Qui impedit neque quisquam beatae, deserunt officia a repellat, blanditiis provident eligendi accusantium amet? Nihil vel exercitationem sapiente vitae, explicabo vero hic voluptatum inventore? Dolore minus at harum vero beatae!
          Dicta optio, quia sapiente numquam commodi ab alias, eius delectus maxime facere quo, repudiandae temporibus reprehenderit ipsam neque tempore rerum? Debitis nemo quos eligendi dolor, nisi sed quibusdam voluptates rerum.
          Accusamus incidunt, tempora officiis harum accusantium illo quis voluptate commodi beatae eum esse unde maxime sit ducimus, reiciendis at quos numquam recusandae? Placeat quaerat, quidem perspiciatis commodi quos minus quisquam.
          Nobis iure nostrum at dolores temporibus laudantium, incidunt eos recusandae dolorem nulla dicta corporis deleniti repellat consectetur animi exercitationem adipisci, sit est veritatis officia quis rerum assumenda. Illo, facilis. Incidunt.</p>

          <h3 className="text-xl font-bold mb-4">What is Next.js?</h3>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, nisi repellendus debitis obcaecati, optio fuga quaerat ex hic cupiditate facere nulla quos perferendis aperiam consectetur culpa natus delectus, repellat doloribus.
          Adipisci ad nostrum saepe totam debitis voluptates voluptatum quis quos eligendi facere, blanditiis atque officia necessitatibus voluptas? Nihil laboriosam, neque tempora quaerat optio saepe dolores rem voluptates aperiam dolor. Dolorum!
          Consequuntur soluta, placeat molestiae quo consectetur eius eveniet maiores dolore fugiat provident libero corporis illo sed, distinctio labore, fuga veniam. Illum hic tempora, placeat doloremque quaerat sequi sunt natus asperiores?
          Eaque numquam assumenda in quibusdam tempora, placeat ab ipsam corporis beatae qui. Quod animi aperiam suscipit vitae, quis, dicta necessitatibus sequi alias odio a placeat earum amet consequatur repellendus neque?
          Quibusdam mollitia voluptatum soluta veritatis magnam perspiciatis. Quas recusandae autem ducimus minima, sequi repellendus voluptates doloribus nam odio minus magnam, doloremque fugiat quasi sunt aspernatur, esse cum quibusdam commodi aliquam?
          Magni voluptates laudantium autem possimus molestiae ex sint, consequatur quae modi error dolores odit nisi nobis esse maxime recusandae dolore porro quaerat quidem! Repellat nulla fuga harum ducimus assumenda rerum.
          Ratione, itaque inventore? Natus ut debitis eaque, quod repellat est accusantium facilis aut minima a ipsam assumenda perspiciatis enim doloremque voluptates autem dolore voluptatibus. Commodi explicabo saepe nulla nihil hic.
          Dolorem nostrum magni porro aspernatur! Assumenda quidem quam, a commodi sed ad ipsum enim? Distinctio ipsam id eius nulla excepturi alias dolor consectetur, dolore eveniet iure nostrum eligendi quisquam nemo!
          Facere quibusdam deserunt a soluta quae, harum quam aut repellendus sit. Tempora dolores iure molestiae enim. Nulla at nihil officiis asperiores nemo, fugiat sequi soluta, quidem placeat voluptas rem natus?
          Voluptate fugit sunt magni consequuntur harum quod, voluptatem suscipit quo eos nobis sequi eaque quibusdam corrupti exercitationem inventore labore excepturi veritatis provident tempore illo molestias corporis odio? Tempora, explicabo harum?
          Ab libero quam, recusandae maxime a dolorum eos ipsum quis velit, perspiciatis esse et repudiandae, nemo veniam quisquam sit ducimus porro facilis cupiditate obcaecati optio voluptates saepe iure labore? Accusamus.
          Laborum delectus saepe ipsa exercitationem asperiores nobis itaque provident, magni temporibus corporis aperiam aspernatur pariatur, dolore soluta molestias. Similique numquam temporibus sequi doloremque, nisi a perspiciatis laboriosam officiis nesciunt id!
          Id ad ipsum ratione nesciunt est eligendi porro voluptate dolores esse corrupti, fugit distinctio repellat, obcaecati numquam voluptas repellendus? Nostrum consequuntur pariatur assumenda corporis placeat exercitationem iure optio dignissimos tempore.
          Fugit similique dicta illum vero voluptate, magnam assumenda autem illo hic veritatis inventore quidem nesciunt aspernatur atque animi aliquid exercitationem dignissimos sint quos praesentium! Quis officia deserunt ab ullam vero?
          Veritatis possimus eum ipsa repudiandae, sed nisi consequuntur ipsam cupiditate ab itaque similique modi, error iusto numquam dolor nesciunt eos quam sint harum. Iste molestiae ipsum doloremque atque? Numquam, veniam?</p>

          <h4 className="text-lg font-bold mb-4">Why Use Next.js?</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae animi, ipsa voluptatem placeat laborum odio deleniti, corrupti adipisci ipsum minima omnis natus doloribus, accusamus optio esse obcaecati! Tenetur, similique error.
          Optio consequuntur laudantium unde quas quam in quisquam culpa, qui sit? Sit labore quas, deleniti accusantium minus consequuntur libero natus quaerat voluptas nostrum, vero eligendi incidunt dolores, esse doloribus at?
          Velit molestias perspiciatis pariatur asperiores id quidem, ipsum eveniet mollitia voluptatum. Architecto soluta voluptate minima cupiditate sit cumque quos veritatis expedita facere iste dolorem tempora eos illum, at odit quia.
          Quasi, libero. Est dolores iste accusamus eos fuga illo ullam quas sunt qui, autem ad in reiciendis numquam animi veritatis voluptatum beatae magni labore commodi tempore cum. Ullam, repudiandae a.
          Qui laudantium explicabo totam consequatur ipsa quod quos, rerum eligendi fugiat, sed at voluptate mollitia nemo eos possimus et dolores est iste excepturi, doloremque aperiam quia. Necessitatibus quos nobis unde.
          Numquam eligendi itaque, suscipit voluptatem iste nesciunt ducimus amet tenetur, obcaecati quibusdam libero atque commodi aut perspiciatis iusto aspernatur tempore, minima excepturi impedit necessitatibus incidunt sunt eaque. Inventore, autem cum.
          Necessitatibus esse harum debitis, dolore molestias ratione, iusto beatae tempora ab accusamus modi consequatur. Suscipit facilis laboriosam vitae deserunt! Aspernatur, totam. Ipsa veniam dignissimos, qui asperiores consequatur exercitationem cupiditate velit!
          Sapiente laudantium iste exercitationem. Aliquam inventore dolorem facere quas error eos quae, beatae vero voluptates quasi dolorum asperiores consectetur dignissimos animi quo sit commodi itaque impedit eveniet laudantium sed aut!
          Assumenda deleniti, hic eos enim quam suscipit consequuntur quos ex omnis aliquam, nesciunt eaque. Rem perferendis hic ipsam eligendi deleniti qui beatae officiis eius doloribus quas et reiciendis, pariatur maxime.
          Quibusdam deserunt eaque assumenda, ad cupiditate reprehenderit eligendi amet at rem quisquam, explicabo itaque, nam asperiores quidem doloribus nesciunt odio. Molestiae repellendus et aliquam reprehenderit autem iste modi distinctio delectus.
          Soluta, cupiditate modi! Harum quaerat sint architecto ad ratione ipsam vero cumque, vitae aliquam velit perspiciatis accusamus explicabo nobis expedita cum dolores atque, ipsa culpa nemo ducimus nulla repellendus quia.
          Enim impedit quam nulla mollitia et illum quod neque architecto modi eos totam voluptatum, deserunt libero, expedita itaque eius inventore cumque debitis facilis optio rem error corrupti? Laboriosam, doloremque rerum.
          Perferendis suscipit nobis ratione tenetur eveniet praesentium consectetur reiciendis hic. Minima at suscipit iste quo? Libero, natus at eligendi expedita eaque totam vitae, possimus nisi necessitatibus doloremque sapiente harum. Aliquam.
          Dolore, obcaecati maiores? Sunt doloremque voluptas consequuntur? Officia asperiores molestias dignissimos cum saepe, placeat facere, quod exercitationem aspernatur modi eius accusamus. Necessitatibus, ad nesciunt provident deleniti sit sed reprehenderit temporibus.
          Amet temporibus enim consectetur corporis minima perspiciatis quis autem natus eaque pariatur, iste fugiat repudiandae quisquam ducimus qui officia tempora nesciunt molestias doloremque at totam vel delectus. Soluta, quia quaerat.</p>

          <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos maiores reprehenderit culpa dolorem soluta! Voluptas exercitationem incidunt animi magni ipsam suscipit debitis excepturi delectus, consequatur minus sint placeat maiores quaerat!
          Iste pariatur aut itaque hic enim maxime non aspernatur, consequatur, officiis labore, velit qui rerum eius fugiat reiciendis eligendi nostrum? Modi pariatur voluptatibus veritatis, corporis temporibus aliquid beatae labore fuga!
          Distinctio nam necessitatibus soluta suscipit tempora! Impedit eligendi eius laborum error, eos accusamus saepe sunt nulla hic voluptatum quas ipsum sapiente, nihil minima numquam porro? Dolores maxime animi odio fugiat.
          Libero labore animi eius dignissimos. Numquam animi, modi voluptas, explicabo doloremque, tempore molestiae necessitatibus iure magni alias fugit quod! Distinctio perferendis repudiandae ab aspernatur doloribus dicta quidem reprehenderit sapiente alias!
          Iste nostrum reprehenderit laudantium illo natus quod asperiores culpa totam doloribus, odio nam enim deserunt, quidem adipisci? Quae magnam ducimus amet eos atque quia. Et, amet ipsa! Quas, explicabo doloribus!
          Laborum dolor, consequuntur dicta nemo modi eius quod excepturi cupiditate accusamus facilis vel, optio sint id! Illum libero, architecto possimus corrupti dolore sint magni vel tempora fugit non, est laudantium!
          Ullam nostrum esse dolor quidem excepturi tempora aspernatur architecto recusandae consectetur perspiciatis, laboriosam mollitia, dolorum blanditiis quisquam rem a fuga deleniti laborum vel veniam corporis! Incidunt iusto aliquam voluptate inventore!
          Amet enim quam nihil quae molestias iure nesciunt et quibusdam culpa asperiores? Beatae saepe eum neque mollitia dolores quod commodi provident ratione nesciunt nobis, illo illum quidem, rem labore nihil.
          Minima culpa alias voluptate expedita cumque a, aliquam quibusdam explicabo consectetur eligendi architecto eos blanditiis similique quidem, fugit animi accusamus id. Enim blanditiis quis atque eos nam libero in excepturi.
          Nisi aliquam ad molestiae sed amet laborum sapiente delectus quia, ab, quaerat quasi vel unde cupiditate deleniti enim sequi, veniam placeat nostrum saepe corrupti. Dicta minus pariatur officiis quibusdam corrupti.
          Architecto recusandae consequatur nihil tempora voluptates beatae? In magnam nostrum fugit quod exercitationem, alias necessitatibus earum atque rerum quasi repellendus dignissimos, modi error illo laboriosam enim dolore non asperiores deleniti.
          Distinctio, architecto sint quis amet nobis sunt est! Deserunt beatae illo debitis ut necessitatibus aperiam dolor sint, voluptatem odio! Debitis dolorum esse iure explicabo temporibus fugit minus suscipit perferendis quod.
          Magnam provident inventore saepe ad voluptatem cum at rerum ea, soluta eveniet minima harum, hic amet tenetur impedit nihil vitae dolor velit debitis nesciunt dignissimos earum nisi. Porro, accusantium ab!
          Laudantium molestiae ipsum, voluptates incidunt, illo in vitae veniam rerum totam magnam possimus quae cum perferendis excepturi molestias. Numquam deserunt, nihil quo qui asperiores corrupti saepe vero accusantium atque dolorem.
          Dignissimos consequatur assumenda at cumque quas dolorum, recusandae a quo maiores, deleniti dolores placeat obcaecati ratione nemo hic saepe laudantium eveniet sed praesentium corporis, odio esse suscipit unde. Perspiciatis, molestiae.</p>
        </div>
      </div>
    </div>
  );
}
