import requests
from bs4 import BeautifulSoup
import json

def get_sibling_text(soup, label):
    element = None
    for strong in soup.find_all('strong'):
        if label in strong.get_text(strip=True):
            element = strong
            break
    if element:
        return element.find_next_sibling(string=True).strip()
    return ""

def parse_job_details(soup):
    # BeautifulSoup을 사용하여 필요한 정보를 추출
    details = {
        "업종": get_sibling_text(soup, '업 종'),
        "상호": get_sibling_text(soup, '상 호'),
        "구인주소": get_sibling_text(soup, '주 소'),
        "모집기간":  get_sibling_text(soup, '모 집 기 간'),
        "모집인원": get_sibling_text(soup, '모 집 인 원'),
        "근무시간": get_sibling_text(soup, '근 무 시 간'),
        "급여": get_sibling_text(soup, '급 여'),
        "채용담당": get_sibling_text(soup, '채 용 담 당')
        
    }
    return details

def crawl_job_page(url):
    response = requests.get(url, headers={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    })
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        content = soup.find('ul', {'class': 'jobcont'})
        if content:
            return parse_job_details(content)
    return None

def save_jobs_to_file(jobs, filename='jobs.json'):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(jobs, f, ensure_ascii=False, indent=4)

if __name__ == '__main__':
    base_url = 'https://www.jbnu.ac.kr/kor/?menuID=425&mode=view&no='
    start_no = 84132  # 최신 게시글 번호
    num_jobs_to_crawl = 200
    jobs = []

    for i in range(num_jobs_to_crawl):
        job_no = start_no - i
        job_url = f'{base_url}{job_no}'
        job_details = crawl_job_page(job_url)
        if job_details:
            jobs.append(job_details)
        else:
            print(f'Failed to crawl {job_url}')

    save_jobs_to_file(jobs)
    print(f'성공적으로 {len(jobs)}개 크롤링 성공!')