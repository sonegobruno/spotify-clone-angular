
export const MockSpotifyService = jasmine.createSpyObj(
  'SpotifyService', {
    getLoginUrl: () => 'fake-url',
    getCallbackToken: () => 'fake=token',
    setAccessToken: () => {}
  }
)
