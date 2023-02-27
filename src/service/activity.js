import { PSClient } from 'plat-sdk'

// TODO revise integration with portal later, this is minor can can be removed when integrate with a new portal
export default {
  downloadAction(data) {
    let baseUrl = window.baseUrlTrackDownload
    let token = localStorage.ps_access_token
    if (baseUrl) {
      let psClient = new PSClient({
        baseUrl, token
      })
      let payload = {
        action: 'DOWNLOAD_MAP_REPORT',
        object_id: data.client_id,
        object_type: 'client',
        data: {
          app_profile: 'mwrw',
          module: 'MAP',
          report_id: data.report_id,
          report_name: data.report_name
        }
      }
      psClient.createActivity(payload)
    } else {
      console.error('Please check url again!')
    }
  }
}
