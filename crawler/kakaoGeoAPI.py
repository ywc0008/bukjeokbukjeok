import requests, json

address = '전라북도 전주시 완산구 백제대로 13'
url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + address

headers = {'Authorization': 'KakaoAK fb5a30e569f5e1d895e6f9b69d5a78ad'}
api_json = json.loads(str(requests.get(url,headers=headers).text))
address = api_json['documents'][0]['address']
add = {"lat": str(address['y']), "lng": str(address['x'])}
address_name = address['address_name']

print(add)