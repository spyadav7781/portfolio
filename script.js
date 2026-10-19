document.getElementById('year').textContent = new Date().getFullYear();

// Fade sections in as they scroll into view
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Highlight the nav link for the section currently in view
const links = document.querySelectorAll('.nav nav a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));

// Sliding skills with logos (icons from the Devicon CDN; edit this list)
const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';
const rows = [
  [['Java','java/java-original'],['Spring Boot','spring/spring-original'],['Hibernate','hibernate/hibernate-original'],['VBCS','@vbcs'],['JavaScript','javascript/javascript-original'],['HTML5','html5/html5-original'],['CSS3','css3/css3-original'],['SQL Server','microsoftsqlserver/microsoftsqlserver-plain'],['MySQL','mysql/mysql-original'],['MongoDB','mongodb/mongodb-original']],
  [['Claude Code','@claude'],['MCP','@mcp'],['AI Agents','@agent'],['Oracle Cloud','oracle/oracle-original'],['AWS','amazonwebservices/amazonwebservices-plain-wordmark'],['Docker','docker/docker-original'],['CI/CD','@cicd'],['GitHub Actions','githubactions/githubactions-original'],['Git','git/git-original'],['Maven','maven/maven-original'],['Postman','postman/postman-original'],['IntelliJ IDEA','intellij/intellij-original'],['Jira','jira/jira-original']]
];
const iconSrc = (p) => p[0] === '@' ? `img/icons/${p.slice(1)}.svg` : `${D}${p}.svg`;
document.querySelectorAll('.marquee').forEach((m, i) => {
  const items = rows[i].map(([name, path]) =>
    `<div class="skill"><img src="${iconSrc(path)}" alt="" onerror="this.remove()"><span>${name}</span></div>`).join('');
  m.querySelector('.track').innerHTML = items + items; // duplicated for a seamless loop
});
