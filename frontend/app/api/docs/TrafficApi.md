# TrafficApi

All URIs are relative to *http://localhost:5001/cortexre-home-task/us-central1/api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**bulkCreateTraffic**](#bulkcreatetraffic) | **POST** /traffic/bulk | Create multiple traffic entries|
|[**bulkUpdateTraffic**](#bulkupdatetraffic) | **PUT** /traffic/bulk/update | Update multiple traffic entries|
|[**createTraffic**](#createtraffic) | **POST** /traffic/ | Create a new traffic entry|
|[**deleteTraffic**](#deletetraffic) | **DELETE** /traffic/{id} | Delete a traffic entry by ID|
|[**getAllTraffic**](#getalltraffic) | **GET** /traffic/ | Get all traffic entries|
|[**getTrafficById**](#gettrafficbyid) | **GET** /traffic/{id} | Get a traffic entry by ID|
|[**updateTraffic**](#updatetraffic) | **PUT** /traffic/{id} | Update a traffic entry by ID|

# **bulkCreateTraffic**
> Array<Traffic> bulkCreateTraffic(newTraffic)


### Example

```typescript
import {
    TrafficApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TrafficApi(configuration);

let newTraffic: Array<NewTraffic>; //

const { status, data } = await apiInstance.bulkCreateTraffic(
    newTraffic
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **newTraffic** | **Array<NewTraffic>**|  | |


### Return type

**Array<Traffic>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Entries created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **bulkUpdateTraffic**
> BulkUpdateTraffic200Response bulkUpdateTraffic(traffic)


### Example

```typescript
import {
    TrafficApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TrafficApi(configuration);

let traffic: Array<Traffic>; //

const { status, data } = await apiInstance.bulkUpdateTraffic(
    traffic
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **traffic** | **Array<Traffic>**|  | |


### Return type

**BulkUpdateTraffic200Response**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Entries updated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createTraffic**
> Traffic createTraffic(newTraffic)


### Example

```typescript
import {
    TrafficApi,
    Configuration,
    NewTraffic
} from './api';

const configuration = new Configuration();
const apiInstance = new TrafficApi(configuration);

let newTraffic: NewTraffic; //

const { status, data } = await apiInstance.createTraffic(
    newTraffic
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **newTraffic** | **NewTraffic**|  | |


### Return type

**Traffic**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Entry created successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteTraffic**
> deleteTraffic()


### Example

```typescript
import {
    TrafficApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TrafficApi(configuration);

let id: string; //Entry ID (default to undefined)

const { status, data } = await apiInstance.deleteTraffic(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Entry ID | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | Entry deleted successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllTraffic**
> PaginationTraffic getAllTraffic()


### Example

```typescript
import {
    TrafficApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TrafficApi(configuration);

let page: number; //Page number for pagination (optional) (default to 1)
let limit: number; //Number of items per page (optional) (default to 5)
let sortKey: 'date' | 'visits' | 'id'; //Field to sort by (optional) (default to 'date')
let sortDirection: 'asc' | 'desc'; //Sort direction (optional) (default to 'asc')
let filters: string; //JSON stringified filter object (e.g., {\"minVisits\":10,\"maxVisits\":100,\"fromDate\":\"2024-01-01\"}) (optional) (default to undefined)

const { status, data } = await apiInstance.getAllTraffic(
    page,
    limit,
    sortKey,
    sortDirection,
    filters
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Page number for pagination | (optional) defaults to 1|
| **limit** | [**number**] | Number of items per page | (optional) defaults to 5|
| **sortKey** | [**&#39;date&#39; | &#39;visits&#39; | &#39;id&#39;**]**Array<&#39;date&#39; &#124; &#39;visits&#39; &#124; &#39;id&#39;>** | Field to sort by | (optional) defaults to 'date'|
| **sortDirection** | [**&#39;asc&#39; | &#39;desc&#39;**]**Array<&#39;asc&#39; &#124; &#39;desc&#39;>** | Sort direction | (optional) defaults to 'asc'|
| **filters** | [**string**] | JSON stringified filter object (e.g., {\&quot;minVisits\&quot;:10,\&quot;maxVisits\&quot;:100,\&quot;fromDate\&quot;:\&quot;2024-01-01\&quot;}) | (optional) defaults to undefined|


### Return type

**PaginationTraffic**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of traffic entries |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getTrafficById**
> Traffic getTrafficById()


### Example

```typescript
import {
    TrafficApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TrafficApi(configuration);

let id: string; //Entry ID (default to undefined)

const { status, data } = await apiInstance.getTrafficById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Entry ID | defaults to undefined|


### Return type

**Traffic**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A traffic entry |  -  |
|**404** | Entry not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateTraffic**
> Traffic updateTraffic(newTraffic)


### Example

```typescript
import {
    TrafficApi,
    Configuration,
    NewTraffic
} from './api';

const configuration = new Configuration();
const apiInstance = new TrafficApi(configuration);

let id: string; //Entry ID (default to undefined)
let newTraffic: NewTraffic; //

const { status, data } = await apiInstance.updateTraffic(
    id,
    newTraffic
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **newTraffic** | **NewTraffic**|  | |
| **id** | [**string**] | Entry ID | defaults to undefined|


### Return type

**Traffic**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Entry updated successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

