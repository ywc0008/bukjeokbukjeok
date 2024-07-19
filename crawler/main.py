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
        return element.find_next_sibling(text=True).strip()
    return ""

def parse_job_details(soup):
    # BeautifulSoup을 사용하여 필요한 정보를 추출
    details = {
        "업종": get_sibling_text(soup, '업 종'),
        "상호": get_sibling_text(soup, '상 호'),
        "구인주소": get_sibling_text(soup, '주 소'),
        "모집기간": {
            "시작": get_sibling_text(soup, '모 집 기 간').split(' ~ ')[0],
            "종료": get_sibling_text(soup, '모 집 기 간').split(' ~ ')[1]
        },
        "모집인원": int(get_sibling_text(soup, '모 집 인 원')),
        "근무시간": get_sibling_text(soup, '근 무 시 간'),
        "급여": {
            "형태": get_sibling_text(soup, '급 여').split(' / ')[0],
            "금액": int(get_sibling_text(soup, '급 여').split(' / ')[1].replace(',', ''))
        },
        "채용담당": get_sibling_text(soup, '채 용 담 당')
        
    }
    return details

def crawl_job_page(url):
    response = requests.get(url, headers={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    })
    soup = BeautifulSoup(response.text, 'html.parser')

    content = soup.find('ul', {'class': 'jobcont'})  # 적절한 셀렉터로 수정 필요
    if content:
        return parse_job_details(content)
    return {}

def save_job_to_file(job):
    with open('job.json', 'w', encoding='utf-8') as f:
        json.dump(job, f, ensure_ascii=False, indent=4)

if __name__ == '__main__':
    job_url = 'https://www.jbnu.ac.kr/kor/?menuID=425&mode=view&no=84129'
    job = crawl_job_page(job_url)
    print(job)
    save_job_to_file(job)